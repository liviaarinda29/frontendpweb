import { NextResponse } from 'next/server';

type Params = {
  params: Promise<{ id: string }>;
};

const API_URL = 'https://projectrestapi.vercel.app/api/products';

// ==========================================
// 1. GET: Ambil Detail 1 Produk
// ==========================================
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const response = await fetch(`${API_URL}/${id}`, {
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Produk tidak ditemukan',
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
        error: err?.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

// ==========================================
// 2. PUT: Update Produk
// ==========================================
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
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
          message: 'Gagal update atau produk tidak ditemukan',
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
        error: err?.message || 'Invalid Request Body',
      },
      { status: 400 }
    );
  }
}

// ==========================================
// 3. DELETE: Hapus Produk
// ==========================================
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Produk tidak ditemukan atau gagal dihapus',
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
        error: err?.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}