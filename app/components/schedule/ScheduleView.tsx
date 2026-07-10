import { motion } from "framer-motion";
import { Link } from "react-router";
import { Settings } from "lucide-react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { styled } from "styled-system/jsx";
import { useApp } from "~/context/AppContext";
import { ActivityCard } from "./ActivityCard";
import { enrichActivitiesWithStatus } from "~/lib/time";
import { DAY_NAMES } from "~/types";

const Header = styled("header", {
  base: {
    bg: "white",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderColor: "gray.200",
    px: "6",
    py: "4",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
});

const DayTitle = styled("div", {
  base: {
    fontFamily: "display",
    fontSize: "2xl",
    fontWeight: "bold",
    color: "primary.500",
  },
});

const ClockDisplay = styled("div", {
  base: {
    fontFamily: "display",
    fontSize: "3xl",
    fontWeight: "bold",
    color: "gray.900",
    letterSpacing: "0.05em",
  },
});

const IconButton = styled(Link, {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "full",
    bg: "gray.100",
    color: "gray.500",
    _hover: { bg: "gray.200" },
  },
});

const CurrentActivityBanner = styled(motion.div, {
  base: {
    borderRadius: "xl",
    px: "6",
    py: "4",
    textAlign: "center",
    marginBottom: "2",
  },
});

const HappeningNowLabel = styled("div", {
  base: {
    fontSize: "sm",
    fontWeight: "semibold",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
});

const ActivityName = styled("div", {
  base: {
    fontFamily: "display",
    fontSize: "2xl",
    fontWeight: "bold",
    color: "gray.900",
    marginTop: "1",
  },
});

export function ScheduleView() {
  const { schedules, settings, currentTime } = useApp();

  const today = new Date().getDay();
  const todaySchedule = schedules.find((s) => s.dayOfWeek === today);

  const activitiesWithStatus = todaySchedule
    ? enrichActivitiesWithStatus(todaySchedule.activities, currentTime)
    : [];

  const currentActivity = activitiesWithStatus.find(
    (a) => a.status === "current",
  );
  const hasActivities = activitiesWithStatus.length > 0;

  return (
    <div className={flex({ direction: "column", minH: "100vh", bg: "gray.50", gap: 0 })}>
      <Header>
        <div>
          <DayTitle>{DAY_NAMES[today]}</DayTitle>
          <div className={css({ fontSize: "sm", color: "gray.500", mt: "0.5" })}>
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>

        <div className={flex({ align: "center", gap: "3" })}>
          <ClockDisplay>{currentTime}</ClockDisplay>
          <IconButton to="/admin">
            <Settings style={{ width: "20px", height: "20px" }} />
          </IconButton>
        </div>
      </Header>

      <main
        className={css({
          flex: 1,
          p: "6",
          maxW: "800px",
          mx: "auto",
          w: "full",
        })}
      >
        {!hasActivities ? (
          <NoActivitiesState />
        ) : (
          <div className={flex({ direction: "column", gap: "4", align: "stretch" })}>
            {currentActivity && (
              <CurrentActivityBanner
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  backgroundColor: `${currentActivity.color}15`,
                  border: `2px dashed ${currentActivity.color}`,
                }}
              >
                <HappeningNowLabel style={{ color: currentActivity.color }}>
                  Happening Now
                </HappeningNowLabel>
                <ActivityName>
                  {currentActivity.icon} {currentActivity.name}
                </ActivityName>
              </CurrentActivityBanner>
            )}

            <div className={flex({ direction: "column", gap: "3", align: "stretch" })}>
              {activitiesWithStatus.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  timeFormat={settings.timeFormat}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function NoActivitiesState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={flex({ direction: "column", align: "center", justify: "center", p: "12", textAlign: "center" })}
    >
      <div className={css({ fontSize: "6xl", mb: "4" })}>🌈</div>
      <h2
        className={css({
          fontFamily: "display",
          fontSize: "2xl",
          fontWeight: "bold",
          color: "gray.700",
          margin: 0,
          mb: "2",
        })}
      >
        No Schedule Today!
      </h2>
      <p
        className={css({
          fontSize: "md",
          color: "gray.500",
          margin: 0,
          mb: "6",
          maxW: "400px",
        })}
      >
        Ask a grown-up to set up your daily schedule so you can see what is
        happening today!
      </p>
      <Link
        to="/admin"
        className={css({
          display: "inline-flex",
          alignItems: "center",
          gap: "2",
          px: "6",
          py: "3",
          bg: "primary.500",
          color: "white",
          borderRadius: "full",
          fontWeight: "semibold",
          textDecoration: "none",
          fontSize: "md",
          _hover: { bg: "primary.600", boxShadow: "md" },
        })}
      >
        <CalendarDaysIcon />
        Go to Admin
      </Link>
    </motion.div>
  );
}

function CalendarDaysIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
