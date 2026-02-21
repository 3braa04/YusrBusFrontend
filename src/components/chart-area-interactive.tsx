"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useIsMobile } from "@/hooks/use-mobile"

const chartConfig = {
  totalTrips: {
    label: "الرحلات",
    color: "var(--primary)",
  },
} satisfies ChartConfig

type TripInTimeData = {
  totalTrips: number
  date: string
}

type ChartAreaInteractiveProps = {
  tripsInTime: TripInTimeData[]
}


const mockTripsInTime = [
  { totalTrips: 3, date: "2026-01-01T00:00:00Z" },
  { totalTrips: 5, date: "2026-01-02T00:00:00Z" },
  { totalTrips: 2, date: "2026-01-03T00:00:00Z" },
  { totalTrips: 7, date: "2026-01-04T00:00:00Z" },
  { totalTrips: 4, date: "2026-01-05T00:00:00Z" },
  { totalTrips: 6, date: "2026-01-06T00:00:00Z" },
  { totalTrips: 8, date: "2026-01-07T00:00:00Z" },
  { totalTrips: 3, date: "2026-01-08T00:00:00Z" },
  { totalTrips: 9, date: "2026-01-09T00:00:00Z" },
  { totalTrips: 5, date: "2026-01-10T00:00:00Z" },
  { totalTrips: 2, date: "2026-01-11T00:00:00Z" },
  { totalTrips: 4, date: "2026-01-12T00:00:00Z" },
  { totalTrips: 7, date: "2026-01-13T00:00:00Z" },
  { totalTrips: 6, date: "2026-01-14T00:00:00Z" },
  { totalTrips: 8, date: "2026-01-15T00:00:00Z" },
  { totalTrips: 3, date: "2026-01-16T00:00:00Z" },
  { totalTrips: 5, date: "2026-01-17T00:00:00Z" },
  { totalTrips: 2, date: "2026-01-18T00:00:00Z" },
  { totalTrips: 7, date: "2026-01-19T00:00:00Z" },
  { totalTrips: 4, date: "2026-01-20T00:00:00Z" },
  { totalTrips: 6, date: "2026-01-21T00:00:00Z" },
  { totalTrips: 8, date: "2026-01-22T00:00:00Z" },
  { totalTrips: 3, date: "2026-01-23T00:00:00Z" },
  { totalTrips: 5, date: "2026-01-24T00:00:00Z" },
  { totalTrips: 2, date: "2026-01-25T00:00:00Z" },
  { totalTrips: 7, date: "2026-01-26T00:00:00Z" },
  { totalTrips: 4, date: "2026-01-27T00:00:00Z" },
  { totalTrips: 6, date: "2026-01-28T00:00:00Z" },
  { totalTrips: 8, date: "2026-01-29T00:00:00Z" },
  { totalTrips: 3, date: "2026-01-30T00:00:00Z" },
  { totalTrips: 5, date: "2026-01-31T00:00:00Z" },
  { totalTrips: 2, date: "2026-02-01T00:00:00Z" },
  { totalTrips: 7, date: "2026-02-02T00:00:00Z" },
  { totalTrips: 4, date: "2026-02-03T00:00:00Z" },
  { totalTrips: 6, date: "2026-02-04T00:00:00Z" },
  { totalTrips: 8, date: "2026-02-05T00:00:00Z" },
  { totalTrips: 3, date: "2026-02-06T00:00:00Z" },
  { totalTrips: 5, date: "2026-02-07T00:00:00Z" },
  { totalTrips: 2, date: "2026-02-08T00:00:00Z" },
  { totalTrips: 7, date: "2026-02-09T00:00:00Z" },
  { totalTrips: 4, date: "2026-02-10T00:00:00Z" },
  { totalTrips: 6, date: "2026-02-11T00:00:00Z" },
  { totalTrips: 8, date: "2026-02-12T00:00:00Z" },
  { totalTrips: 3, date: "2026-02-13T00:00:00Z" },
  { totalTrips: 5, date: "2026-02-14T00:00:00Z" },
  { totalTrips: 2, date: "2026-02-15T00:00:00Z" },
  { totalTrips: 7, date: "2026-02-16T00:00:00Z" },
  { totalTrips: 4, date: "2026-02-17T00:00:00Z" },
  { totalTrips: 6, date: "2026-02-18T00:00:00Z" },
  { totalTrips: 8, date: "2026-02-19T00:00:00Z" },
  { totalTrips: 1, date: "2026-02-20T00:00:00Z" },
  { totalTrips: 5, date: "2026-02-21T00:00:00Z" },
  { totalTrips: 3, date: "2026-02-22T00:00:00Z" },
  { totalTrips: 7, date: "2026-02-23T00:00:00Z" },
  { totalTrips: 4, date: "2026-02-24T00:00:00Z" },
  { totalTrips: 6, date: "2026-02-25T00:00:00Z" },
  { totalTrips: 8, date: "2026-02-26T00:00:00Z" },
  { totalTrips: 3, date: "2026-02-27T00:00:00Z" },
  { totalTrips: 5, date: "2026-02-28T00:00:00Z" },
  { totalTrips: 2, date: "2026-03-01T00:00:00Z" },
  { totalTrips: 7, date: "2026-03-02T00:00:00Z" },
  { totalTrips: 4, date: "2026-03-03T00:00:00Z" },
  { totalTrips: 6, date: "2026-03-04T00:00:00Z" },
  { totalTrips: 8, date: "2026-03-05T00:00:00Z" },
  { totalTrips: 3, date: "2026-03-06T00:00:00Z" },
  { totalTrips: 5, date: "2026-03-07T00:00:00Z" },
  { totalTrips: 2, date: "2026-03-08T00:00:00Z" },
  { totalTrips: 7, date: "2026-03-09T00:00:00Z" },
  { totalTrips: 4, date: "2026-03-10T00:00:00Z" },
  { totalTrips: 6, date: "2026-03-11T00:00:00Z" },
  { totalTrips: 8, date: "2026-03-12T00:00:00Z" },
  { totalTrips: 3, date: "2026-03-13T00:00:00Z" },
  { totalTrips: 5, date: "2026-03-14T00:00:00Z" },
  { totalTrips: 2, date: "2026-03-15T00:00:00Z" },
  { totalTrips: 7, date: "2026-03-16T00:00:00Z" },
  { totalTrips: 4, date: "2026-03-17T00:00:00Z" },
  { totalTrips: 6, date: "2026-03-18T00:00:00Z" },
  { totalTrips: 8, date: "2026-03-19T00:00:00Z" },
  { totalTrips: 3, date: "2026-03-20T00:00:00Z" },
  { totalTrips: 5, date: "2026-03-21T00:00:00Z" },
  { totalTrips: 2, date: "2026-03-22T00:00:00Z" },
  { totalTrips: 7, date: "2026-03-23T00:00:00Z" },
  { totalTrips: 4, date: "2026-03-24T00:00:00Z" },
  { totalTrips: 6, date: "2026-03-25T00:00:00Z" },
  { totalTrips: 8, date: "2026-03-26T00:00:00Z" },
  { totalTrips: 3, date: "2026-03-27T00:00:00Z" },
  { totalTrips: 5, date: "2026-03-28T00:00:00Z" },
  { totalTrips: 2, date: "2026-03-29T00:00:00Z" },
  { totalTrips: 7, date: "2026-03-30T00:00:00Z" },
  { totalTrips: 4, date: "2026-03-31T00:00:00Z" },
  { totalTrips: 6, date: "2026-04-01T00:00:00Z" },
  { totalTrips: 8, date: "2026-04-02T00:00:00Z" },
  { totalTrips: 3, date: "2026-04-03T00:00:00Z" },
  { totalTrips: 5, date: "2026-04-04T00:00:00Z" },
  { totalTrips: 2, date: "2026-04-05T00:00:00Z" },
  { totalTrips: 7, date: "2026-04-06T00:00:00Z" },
  { totalTrips: 4, date: "2026-04-07T00:00:00Z" },
  { totalTrips: 6, date: "2026-04-08T00:00:00Z" },
  { totalTrips: 8, date: "2026-04-09T00:00:00Z" },
  { totalTrips: 3, date: "2026-04-10T00:00:00Z" }
];
export function ChartAreaInteractive({ tripsInTime }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = mockTripsInTime.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>مجموع الرحلات</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">اخر 3 اشهر</ToggleGroupItem>
            <ToggleGroupItem value="30d">اخر 30 يوم</ToggleGroupItem>
            <ToggleGroupItem value="7d">اخر 7 ايام</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="اخر 3 اشهر" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">اخر 90 يوم</SelectItem>
              <SelectItem value="30d" className="rounded-lg">اخر 30 يوم</SelectItem>
              <SelectItem value="7d" className="rounded-lg">اخر 7 ايام</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-totalTrips)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-totalTrips)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="totalTrips"
              type="natural"
              fill="url(#fillTrips)"
              stroke="var(--color-totalTrips)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}