import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  const secret = request.nextUrl.searchParams.get("secret");
  const path = request.nextUrl.searchParams.get("path") || "/produk";

  // 1. Jika secret tidak sama dengan process.env.REVALIDATE_SECRET -> balas status 401
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Secret salah" }, { status: 401 });
  }

  // 2. Panggil revalidatePath(path)
  revalidatePath(path);

  // 3. Balas JSON { revalidated: true, path }
  return NextResponse.json({ revalidated: true, path });
}