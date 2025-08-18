import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Star,
  Play,
  Users,
  Trophy,
  BookOpen,
  Sparkles,
  Medal,
  Target,
  Crown,
  Gamepad2,
  User,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-emerald-50">
      {/* Header */}
      <header className="px-4 py-6 md:px-6 sticky top-0 bg-white/80 backdrop-blur-sm border-b border-pink-100 z-50">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-emerald-300 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif font-black text-xl text-gray-800">
              LinguaPlay
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#games"
              className="font-sans text-gray-600 hover:text-pink-600 transition-colors"
            >
              Games
            </a>
            <a
              href="#leaderboard"
              className="font-sans text-gray-600 hover:text-pink-600 transition-colors"
            >
              Leaderboard
            </a>
            <a
              href="#profile"
              className="font-sans text-gray-600 hover:text-pink-600 transition-colors"
            >
              Profile
            </a>
          </div>
          <Button
            variant="outline"
            className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:px-6 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200">
                  New Adventure Awaits
                </Badge>
                <h1 className="font-serif font-black text-4xl md:text-6xl text-gray-800 leading-tight">
                  Unlock the Joy of{" "}
                  <span className="text-transparent bg-gradient-to-r from-pink-400 to-emerald-400 bg-clip-text">
                    Language Learning!
                  </span>
                </h1>
                <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed">
                  Engage your child with fun, interactive games designed to make
                  learning a new language exciting and effective.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Adventure Today!
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg rounded-xl bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="font-sans text-sm text-gray-600">
                  Loved by{" "}
                  <span className="font-semibold text-gray-800">10,000+</span>{" "}
                  families worldwide
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 animate-float">
                <img
                  src="/cheerful-children-language-game.png"
                  alt="Children enjoying language learning games"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-bounce-gentle opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-float opacity-80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
              Why Children Love LinguaPlay
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Our carefully designed features make language learning feel like
              play, not work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-pink-100 hover:border-pink-200 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-800">
                  Interactive Lessons
                </h3>
                <p className="font-sans text-gray-600">
                  Engaging stories and games that adapt to your child's learning
                  pace and style.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-800">
                  Fun Challenges
                </h3>
                <p className="font-sans text-gray-600">
                  Exciting quests and mini-games that reward progress and build
                  confidence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-800">
                  Progress Tracking
                </h3>
                <p className="font-sans text-gray-600">
                  Parents can monitor learning milestones and celebrate
                  achievements together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="games" className="px-4 py-16 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
              Explore Our Games
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Discover a world of interactive games designed to make language
              learning an adventure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-pink-100 hover:border-pink-200 transition-all duration-300 hover:shadow-lg group overflow-hidden">
              <div className="relative">
                <img
                  src="/colorful-word-matching-game.png"
                  alt="Word Matching Game"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-pink-500 text-white">Popular</Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-pink-500" />
                  <h3 className="font-serif font-bold text-lg text-gray-800">
                    Word Safari
                  </h3>
                </div>
                <p className="font-sans text-gray-600 text-sm">
                  Match words with adorable animals while exploring different
                  habitats.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-gray-500">
                    Ages 4-8
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg group overflow-hidden">
              <div className="relative">
                <img
                  src="/pronunciation-game.png"
                  alt="Pronunciation Game"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-emerald-500 text-white">New</Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-serif font-bold text-lg text-gray-800">
                    Speak & Shine
                  </h3>
                </div>
                <p className="font-sans text-gray-600 text-sm">
                  Practice pronunciation with AI feedback and fun voice
                  challenges.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="font-sans text-xs text-gray-500">
                    Ages 6-12
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg group overflow-hidden">
              <div className="relative">
                <img
                  src="/magical-adventure-game.png"
                  alt="Story Adventure Game"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <h3 className="font-serif font-bold text-lg text-gray-800">
                    Magic Tales
                  </h3>
                </div>
                <p className="font-sans text-gray-600 text-sm">
                  Interactive stories where children choose their own language
                  learning adventure.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-sans text-xs text-gray-500">
                    Ages 5-10
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Play All Games
            </Button>
          </div>
        </div>
      </section>

      <section
        id="leaderboard"
        className="px-4 py-16 md:px-6 bg-gradient-to-br from-yellow-50 to-orange-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
              Top Language Learners
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              See how your child ranks among our amazing community of young
              language learners!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Top 3 Winners */}
            <div className="lg:col-span-2">
              <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <h3 className="font-serif font-bold text-xl text-gray-800">
                      This Week's Champions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* 1st Place */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl border border-yellow-200">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-lg text-gray-800">
                            Emma L.
                          </span>
                          <Badge className="bg-yellow-500 text-white text-xs">
                            1st
                          </Badge>
                        </div>
                        <p className="font-sans text-sm text-gray-600">
                          2,450 points • Spanish
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-serif font-bold text-xl text-yellow-600">
                          🏆
                        </div>
                      </div>
                    </div>

                    {/* 2nd Place */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full">
                        <Medal className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-lg text-gray-800">
                            Alex M.
                          </span>
                          <Badge className="bg-gray-500 text-white text-xs">
                            2nd
                          </Badge>
                        </div>
                        <p className="font-sans text-sm text-gray-600">
                          2,180 points • French
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-serif font-bold text-xl text-gray-600">
                          🥈
                        </div>
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full">
                        <Medal className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-lg text-gray-800">
                            Sofia R.
                          </span>
                          <Badge className="bg-orange-500 text-white text-xs">
                            3rd
                          </Badge>
                        </div>
                        <p className="font-sans text-sm text-gray-600">
                          1,920 points • Italian
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-serif font-bold text-xl text-orange-600">
                          🥉
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Card */}
            <div className="space-y-6">
              <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-white">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center mx-auto">
                    <BarChart3 className="w-8 h-8 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-serif font-black text-3xl text-gray-800">
                      15,000+
                    </div>
                    <p className="font-sans text-sm text-gray-600">
                      Active Learners
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-serif font-black text-3xl text-gray-800">
                      12
                    </div>
                    <p className="font-sans text-sm text-gray-600">
                      Languages Available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="profile" className="px-4 py-16 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-gray-800">
              Personalized Learning Journey
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
              Every child gets a unique profile that tracks their progress and
              celebrates their achievements.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-gray-800">
                        Personal Avatar
                      </h3>
                      <p className="font-sans text-gray-600">
                        Customize your learning companion
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🦄</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🐸</span>
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🦋</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-gray-800">
                        Achievement Badges
                      </h3>
                      <p className="font-sans text-gray-600">
                        Collect rewards for milestones
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center">
                      <Crown className="w-6 h-6 text-pink-600" />
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center">
                      <Medal className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="w-12 h-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs">+5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-white shadow-xl">
                <CardContent className="p-8">
                  <img
                    src="/placeholder-htz2p.png"
                    alt="Profile Dashboard Preview"
                    className="w-full rounded-xl shadow-lg"
                  />
                </CardContent>
              </Card>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-bounce-gentle opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-float opacity-80"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl bg-transparent"
                >
                  Learn More
                </Button>
              </div>

              <p className="font-sans text-sm text-gray-500">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 md:px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-pink-300 to-emerald-300 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif font-black text-lg text-gray-800">
              LinguaPlay
            </span>
          </div>
          <p className="font-sans text-sm text-gray-600">
            © 2024 LinguaPlay. Making language learning magical for children
            worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}
