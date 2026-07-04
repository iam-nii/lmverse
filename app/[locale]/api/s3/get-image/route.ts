import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fileKey } = body;

    if (!fileKey)
      return NextResponse.json(
        { success: false, error: "Provide a file key" },
        { status: 400 }
      );
    //
    const image_url = `${process.env.SELECTEL_COURSE_IMAGES_MAIN_DOMAIN}/${fileKey}`;
    try {
      // const response = await SelectelS3.send(command);
      // const imgUrl = await response.Body?.transformToString();
      return NextResponse.json(
        {
          success: true,
          data: image_url,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
