import { NextResponse } from 'next/server';
import axios from 'axios';
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

    // Convert file to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    // Upload to ImgBB
    const imgbbApiKey = '02ede86040a806d18640942ecc23f6cc';
    if (!imgbbApiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'ImgBB API key not configured',
        },
        { status: 500 }
      );
    }

    const imgbbResponse = await axios.post(
      'https://api.imgbb.com/1/upload',
      new URLSearchParams({
        key: imgbbApiKey,
        image: base64Image,
        name: `${uuidv4()}-${file.name}`,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (imgbbResponse.data.success) {
      return NextResponse.json({
        success: true,
        url: imgbbResponse.data.data.url,
        filename: imgbbResponse.data.data.filename,
        delete_url: imgbbResponse.data.data.delete_url,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to upload to ImgBB',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload file',
      },
      { status: 500 }
    );
  }
}
