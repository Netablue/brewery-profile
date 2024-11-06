// app/api/breweries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { breweries } from './data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('name')?.toLowerCase();

  // If `query` is set, filter the results
  if (query) {
    const results = breweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(query)
    );
    return NextResponse.json(results);
  }

  // If `query` is not defined, we return all breweries
  return NextResponse.json(breweries);
}