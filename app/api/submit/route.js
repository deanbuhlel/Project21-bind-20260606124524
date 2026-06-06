import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { analyzeUrlContent } from '@/lib/urlAnalyzer';

export async function POST(req) {
  try {
    const { url, userId } = await req.json();

    if (!url || !userId) {
      return NextResponse.json({ error: 'URL and User ID are required.' }, { status: 400 });
    }

    // Simulate content analysis
    const analyzedData = await analyzeUrlContent(url);

    const { data, error } = await supabaseAdmin
      .from('knowledge_items')
      .insert({
        user_id: userId,
        url: url,
        title: analyzedData.title,
        description: analyzedData.description,
        image_url: analyzedData.image_url,
        content_type: analyzedData.content_type,
        status: 'processed', // Mark as processed after analysis
      })
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'URL submitted and processed successfully!', data }, { status: 200 });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
