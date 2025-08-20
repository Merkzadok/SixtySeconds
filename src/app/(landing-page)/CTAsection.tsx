// components/sections/CTASection.tsx

import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="border-0 bg-gradient-to-br from-pink-100 via-white to-emerald-100 shadow-xl">
          <CardContent className="p-12 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
                Ready to Begin the Adventure?
              </h2>
              <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of families who have discovered the joy of
                learning languages together. Start your free trial today!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
