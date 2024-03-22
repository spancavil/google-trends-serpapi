"use client";

import Input from "@/components/input/input";
import { GoogleTrendsSerpResponse } from "@/interfaces/serpapi/googleTrendsResponse";
import Image from "next/image";
import { useState } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

export default function Home() {
    const [input, setInput] = useState("");
    const [data, setData] = useState<GoogleTrendsSerpResponse>();
    const [loading, setLoading] = useState(false);

    const onSearch = async () => {
        try {
            if (!loading) {
                setLoading(true);
                const data = await fetch("/api/trends", {
                    method: "POST",
                    body: JSON.stringify({ input: input }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const resJSON: GoogleTrendsSerpResponse = await data.json();
                const timeline = resJSON.interest_over_time.timeline_data;
                for (let index = 0; index < timeline.length; index++) {
                    timeline[index].extracted_value =
                        timeline[index].values[0].extracted_value;
                }
                resJSON.interest_over_time.timeline_data = timeline;
                setData(resJSON);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    console.log(data);    

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-5 gap-2 md:p-24 md:gap-5">
            <h1>
                Prueba técnica - Sebastián Ancavil. Google trends with Serpapi
            </h1>
            <div className="flex flex-row justify-start items-center">
                <Input
                    onChange={setInput}
                    value={input}
                    placeholder="Search trend..."
                />
                {!loading ? (
                    <Image
                        onClick={onSearch}
                        width={40}
                        height={40}
                        src={"/search.svg"}
                        alt="search"
                    />
                ) : (
                    <Image
                        width={40}
                        height={40}
                        src={"/loading.svg"}
                        alt="search"
                    />
                )}
            </div>
            {data && <AreaChart
                width={730}
                height={250}
                data={data?.interest_over_time.timeline_data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <Area
                    dataKey="extracted_value"
                    stroke="#8884d8"
                    fill="#8884d8"
                />
                <Tooltip />
            </AreaChart>}
        </main>
    );
}
