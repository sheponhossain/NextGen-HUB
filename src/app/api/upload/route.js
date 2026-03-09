import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type. Only JPG, PNG, and GIF files are allowed.',
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: 'File too large. Maximum file size is 5MB.',
        },
        { status: 400 }
      );
    }

    // Generate unique filename
    const filename = `${uuidv4()}-${file.name}`;
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

    // Save file to public/uploads directory
    await writeFile(filepath, Buffer.from(await file.arrayBuffer()));

    // Return the URL
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      filename: filename,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload file',
      },
      { status: 500 }
    );
  }
}
