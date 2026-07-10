import type { Route } from "./+types/home";
import { Button } from "~/components/ui";
import { Card } from "~/components/ui";
import { motion } from "framer-motion";
import { Sparkles, Star, Heart, Play } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kids App - Fun Learning" },
    { name: "description", content: "A fun app for children to learn and play!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="mx-auto max-w-4xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="mb-6 inline-block text-6xl"
          >
            🌟
          </motion.div>

          <h1
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontSize: "3.75rem",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#f97316",
              marginBottom: "1.5rem",
            }}
          >
            Welcome to Fun Learning!
          </h1>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Explore, play, and learn with our interactive activities designed
            just for you!
          </p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button size="lg" shape="pill" style={{ fontSize: "1.125rem" }}>
              <Play style={{ width: "1.25rem", height: "1.25rem" }} />
              Start Playing
            </Button>
            <Button
              variant="outline"
              size="lg"
              shape="pill"
              style={{ fontSize: "1.125rem" }}
            >
              <Sparkles style={{ width: "1.25rem", height: "1.25rem" }} />
              Explore Activities
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontSize: "2.25rem",
              fontWeight: 700,
              textAlign: "center",
              color: "#374151",
              marginBottom: "3rem",
            }}
          >
            Fun Activities
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                <Card
                  variant="outlined"
                  size="lg"
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <motion.div
                    className="mb-4 text-5xl"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3
                    style={{
                      fontFamily: "Fredoka, Nunito, sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-6 py-16"
        style={{ backgroundColor: "#fff7ed" }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="text-center"
              >
                <div
                  style={{
                    fontFamily: "Fredoka, Nunito, sans-serif",
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: "#f97316",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <h2
            style={{
              fontFamily: "Fredoka, Nunito, sans-serif",
              fontSize: "2.25rem",
              fontWeight: 700,
              color: "#374151",
              marginBottom: "1.5rem",
            }}
          >
            Ready to Start?
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Join thousands of happy kids already learning and having fun!
          </p>
          <Button
            size="xl"
            shape="pill"
            style={{ fontSize: "1.25rem", gap: "0.75rem" }}
          >
            <Heart
              style={{
                width: "1.5rem",
                height: "1.5rem",
                fill: "currentColor",
              }}
            />
            Get Started Now
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: "🎨",
    title: "Creative Drawing",
    description:
      "Express yourself with colors and shapes in our interactive drawing canvas.",
  },
  {
    icon: "🧩",
    title: "Fun Puzzles",
    description:
      "Challenge your mind with puzzles that get more exciting as you progress.",
  },
  {
    icon: "📚",
    title: "Story Time",
    description:
      "Discover magical stories and adventures with our interactive storybooks.",
  },
  {
    icon: "🎵",
    title: "Music & Songs",
    description:
      "Sing along and learn about different musical instruments and sounds.",
  },
  {
    icon: "🔢",
    title: "Numbers Game",
    description:
      "Learn counting and basic math through fun interactive games.",
  },
  {
    icon: "🌈",
    title: "Colors & Shapes",
    description:
      "Explore the world of colors and geometric shapes in a playful way.",
  },
];

const stats = [
  { value: "50+", label: "Fun Activities" },
  { value: "10k+", label: "Happy Kids" },
  { value: "4.9", label: "Star Rating" },
  { value: "100%", label: "Kid Friendly" },
];
