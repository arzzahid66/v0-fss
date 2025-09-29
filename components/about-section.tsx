import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, BookOpen, Heart } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About Our Institution
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Building Tomorrow's Leaders</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Fatima School & College, we believe in nurturing not just academic excellence, but also character,
            creativity, and compassion in every student.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Unity</h3>
              <p className="text-muted-foreground">
                Building a strong community where students, teachers, and families work together towards common goals of
                excellence and growth.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Faith</h3>
              <p className="text-muted-foreground">
                Instilling strong moral values and spiritual guidance that shape character and provide direction for
                life's journey.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Discipline</h3>
              <p className="text-muted-foreground">
                Fostering self-discipline, responsibility, and dedication that leads to personal growth and academic
                achievement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leadership */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <Badge variant="secondary" className="mb-4">
                Our Leadership
              </Badge>
              <h3 className="text-3xl font-bold text-foreground mb-6">Visionary Leaders Guiding Excellence</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our institution is led by dedicated educators and visionaries who are committed to providing the highest
                quality education and creating an environment where every student can thrive and reach their full
                potential.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/founder.jpg-8kEJz3dXV2sEc5KfSBKVDQwssw4JWm.jpeg"
                      alt="Founder"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-foreground">Founder</h4>
                    <p className="text-sm text-muted-foreground mb-3">Visionary Leader</p>
                    <p className="text-sm text-muted-foreground">
                      Established our institution with a dream to provide quality education and moral guidance to the
                      community.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/principle_best%20image-Jdlvln4e7511CgqhMoBzY09XtpSwTk.jpeg"
                      alt="Principal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-foreground">Principal</h4>
                    <p className="text-sm text-muted-foreground mb-3">Academic Leader</p>
                    <p className="text-sm text-muted-foreground">
                      Leading our institution towards academic excellence and comprehensive student development with
                      dedication.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images/principle.jpg-wG4TihQH5oOMmHrKf0nYJIfwLabkcI.jpeg"
                alt="School Leadership"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Achievement Badge */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">A+</div>
                  <div className="text-sm opacity-90">Excellence Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
