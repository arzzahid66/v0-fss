import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, BookOpen, Heart } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <Badge variant="secondary" className="mb-4">
            About Our Institution
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">Building Tomorrow's Leaders</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Fatima School & College, we believe in nurturing not just academic excellence, but also character,
            creativity, and compassion in every student.
          </p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          <Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-3 md:space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Unity</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Building a strong community where students, teachers, and families work together towards common goals of
                excellence and growth.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-3 md:space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Faith</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Instilling strong moral values and spiritual guidance that shape character and provide direction for
                life's journey.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 md:p-8 hover:shadow-lg transition-shadow sm:col-span-2 md:col-span-1">
            <CardContent className="space-y-3 md:space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Discipline</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Fostering self-discipline, responsibility, and dedication that leads to personal growth and academic
                achievement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leadership */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                Our Leadership
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 md:mb-6">Visionary Leaders Guiding Excellence</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Our institution is led by dedicated educators and visionaries who are committed to providing the highest
                quality education and creating an environment where every student can thrive and reach their full
                potential.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/founder.jpg-8kEJz3dXV2sEc5KfSBKVDQwssw4JWm.jpeg"
                      alt="Founder"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg md:text-xl font-bold text-foreground">Founder</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Visionary Leader</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Established our institution with a dream to provide quality education and moral guidance to the
                      community.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mx-auto">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/principle_best%20image-Jdlvln4e7511CgqhMoBzY09XtpSwTk.jpeg"
                      alt="Principal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg md:text-xl font-bold text-foreground">Principal</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">Academic Leader</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Leading our institution towards academic excellence and comprehensive student development with
                      dedication.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/principle.jpg-wG4TihQH5oOMmHrKf0nYJIfwLabkcI.jpeg"
                alt="School Leadership"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Achievement Badge */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-primary text-primary-foreground p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2 md:space-x-3">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
                <div>
                  <div className="text-xl md:text-2xl font-bold">A+</div>
                  <div className="text-xs md:text-sm opacity-90">Excellence Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
