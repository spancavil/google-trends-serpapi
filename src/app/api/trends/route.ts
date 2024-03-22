import { NextResponse } from "next/server";
import { getJson } from "serpapi";

export async function POST(request: Request) {
    const data = await request.json();
    try {
        const json = await getJson({
            api_key:
                "0de42fa6c42b25227479bb28660435a1425a60ba7cb7f21a9e6919ba4bda5646",
            engine: "google_trends",
            q: data["input"],
            geo: "US",
            data_type: "TIMESERIES",
            date: "today 12-m",
        });        
        return NextResponse.json(json);
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
