"use client";

import ProtectedRoute from "@/provider/ProtectPage";
import Subscription from "../_components/subscription";

export default function SubscriptionPage() {
  return (
    <ProtectedRoute>
      <div>
        <Subscription />
      </div>
    </ProtectedRoute>
  );
}
