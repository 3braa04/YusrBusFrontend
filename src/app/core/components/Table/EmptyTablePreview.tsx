"use client";

import { LoaderPinwheelIcon, Table } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../Empty";
type EmptyTableMode = "empty" | "loading";

type EmptyTablePreviewProps = {
  mode: EmptyTableMode;
};
export default function EmptyTablePreview({ mode }: EmptyTablePreviewProps) {
  if (mode === "loading") return <LoadingMode />;
  return <EmptyMode />;
}

function LoadingMode() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Table />
        </EmptyMedia>
        <EmptyTitle>الرجاء الانتظار</EmptyTitle>
        <EmptyDescription>يتم تحميل البيانات المطلوبة</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <LoaderPinwheelIcon />
      </EmptyContent>
    </Empty>
  );
}

function EmptyMode() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Table />
        </EmptyMedia>
        <EmptyTitle>لا توجد بيانات لعرضها</EmptyTitle>
        <EmptyDescription>
          هذا الجدول فارغ ولا يحتوي على بيانات للعرض
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
