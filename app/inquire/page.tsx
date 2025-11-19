import { Suspense } from "react";
import InquireForm from "@/components/InquireForm";

export default function InquirePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <InquireForm />
    </Suspense>
  );
}
