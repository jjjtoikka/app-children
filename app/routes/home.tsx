import type { Route } from "./+types/home";
import { Button } from "~/components/ui";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

const Section = styled("section", {
  base: { px: "6", py: "16" },
});

const Title = styled("h1", {
  base: {
    fontFamily: "display",
    fontSize: "5xl",
    fontWeight: "bold",
    lineHeight: "tight",
    color: "colorPalette.500",
    marginBottom: "6",
  },
});

const Subtitle = styled("p", {
  base: {
    fontSize: "lg",
    color: "gray.500",
    maxW: "600px",
    margin: "0 auto 8",
    lineHeight: "relaxed",
  },
});

const FeatureCard = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    p: "6",
    bg: "white",
    borderRadius: "xl",
    borderWidth: "2px",
    borderColor: "gray.200",
    boxShadow: "md",
    cursor: "pointer",
    transition: "all 0.2s ease",
    _hover: {
      boxShadow: "xl",
      transform: "translateY(-2px)",
    },
  },
});

const FeatureIcon = styled("div", {
  base: {
    fontSize: "4xl",
    marginBottom: "4",
  },
});

const FeatureTitle = styled("h3", {
  base: {
    fontFamily: "display",
    fontSize: "xl",
    fontWeight: "semibold",
    color: "gray.800",
    marginBottom: "2",
  },
});

const FeatureDesc = styled("p", {
  base: {
    fontSize: "sm",
    color: "gray.500",
    lineHeight: "relaxed",
  },
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kids App - Fun Learning" },
    { name: "description", content: "A fun app for children to learn and play!" },
  ];
}

export default function Home() {
  return (
    <div
      className={css({
        minH: "100vh",
        bg: "gray.50",
      })}
    >
      <Section
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className={css({ mx: "auto", maxW: "4xl" })}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className={css({ fontSize: "6xl", mb: "6", display: "inline-block" })}
          >
            🌟
          </motion.div>

          <Title colorPalette="orange">Welcome to Fun Learning!</Title>

          <Subtitle>
            Explore, play, and learn with our interactive activities designed
            just for you!
          </Subtitle>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={css({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "4",
            })}
          >
            <Button size="lg" colorPalette="orange">
              <Play style={{ width: "1.25rem", height: "1.25rem" }} />
              Start Playing
            </Button>
            <Button variant="outline" size="lg" colorPalette="orange">
              <Sparkles style={{ width: "1.25rem", height: "1.25rem" }} />
              Explore Activities
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      <Section>
        <div className={css({ mx: "auto", maxW: "6xl" })}>
          <h2
            className={css({
              fontFamily: "display",
              fontSize: "4xl",
              fontWeight: "bold",
              textAlign: "center",
              color: "gray.800",
              marginBottom: "12",
            })}
          >
            Fun Activities
          </h2>

          <div
            className={css({
              display: "grid",
              gap: "8",
              gridTemplateColumns: ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"],
            })}
          >
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
                <FeatureCard>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                  </motion.div>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDesc>{feature.description}</FeatureDesc>
                </FeatureCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section className={css({ bg: "orange.50", textAlign: "center" })}>
        <div className={css({ mx: "auto", maxW: "4xl" })}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={css({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "8",
            })}
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
                className={css({ textAlign: "center" })}
              >
                <div
                  className={css({
                    fontFamily: "display",
                    fontSize: "4xl",
                    fontWeight: "bold",
                    color: "orange.500",
                  })}
                >
                  {stat.value}
                </div>
                <div className={css({ fontSize: "md", color: "gray.500", fontWeight: "medium" })}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section className={css({ textAlign: "center", py: "20" })}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={css({ mx: "auto", maxW: "2xl" })}
        >
          <h2
            className={css({
              fontFamily: "display",
              fontSize: "4xl",
              fontWeight: "bold",
              color: "gray.800",
              marginBottom: "6",
            })}
          >
            Ready to Start?
          </h2>
          <p
            className={css({
              fontSize: "lg",
              color: "gray.500",
              marginBottom: "8",
              lineHeight: "relaxed",
            })}
          >
            Join thousands of happy kids already learning and having fun!
          </p>
          <Button size="xl" colorPalette="orange">
            Get Started Now
          </Button>
        </motion.div>
      </Section>
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
