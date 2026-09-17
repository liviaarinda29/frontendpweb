import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_URL = 'https://projectrestapi.vercel.app/api/products';

// ==========================================
// 1. GET: Ambil Semua Produk
// ==========================================
export async function GET() {
  try {
    const response = await fetch(API_URL, {
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Gagal mengambil data dari backend',
          data: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal terhubung ke backend',
        error: err?.message || 'Server Error',
      },
      { status: 500 }
    );
  }
}

// ==========================================
// 2. POST: Tambah Produk Baru
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Gagal menambah produk',
          data: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, {
      status: 201,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal terhubung ke backend',
        error: err?.message || 'Server Error',
      },
      { status: 500 }
    );
  }
}