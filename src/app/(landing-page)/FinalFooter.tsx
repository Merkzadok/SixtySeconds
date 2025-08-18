import { Mail, MapPin, Phone, Globe } from "lucide-react";

export default function FinalFooter() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* App Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              <h3 className="text-xl font-bold text-primary">KidsLingo</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Making language learning magical for children! Our interactive app
              helps kids aged 3-12 discover new languages through games,
              stories, and fun activities.
              <span className="text-lg ml-2">🎮📚✨</span>
            </p>
            <div className="flex gap-2 text-2xl">
              <span>🌍</span>
              <span>👶</span>
              <span>🎯</span>
              <span>🏆</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📞</span>
              <h3 className="text-xl font-bold text-primary">Contact Us</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-sm">📧</span>
                <a
                  href="mailto:hello@kidslingo.mn"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@kidslingo.mn
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span className="text-sm">📱</span>
                <span className="text-muted-foreground">+976 9999 1234</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-purple-600" />
                <span className="text-sm">🌐</span>
                <a
                  href="https://kidslingo.mn"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  www.kidslingo.mn
                </a>
              </div>
            </div>
          </div>

          {/* Location & Additional Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <h3 className="text-xl font-bold text-primary">Location</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-600 mt-1" />
                <span className="text-sm">🏢</span>
                <div className="text-muted-foreground">
                  <p>Peace Avenue 17/1</p>
                  <p>Ulaanbaatar 14200</p>
                  <p className="flex items-center gap-1">
                    <span className="text-lg">🇲🇳</span>
                    Mongolia
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>⏰</span>
                  Mon - Fri: 9:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <span>🎯</span>
                  Supporting 5+ languages
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span>©</span>
              2024 KidsLingo. Made with
              <span className="text-red-500">❤️</span>
              in Mongolia
              <span className="text-lg">🇲🇳</span>
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a
                href="#privacy"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span>🔒</span>
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span>📋</span>
                Terms of Service
              </a>
              <a
                href="#support"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span>🆘</span>
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
