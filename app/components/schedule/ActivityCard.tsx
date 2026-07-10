import { motion } from "framer-motion";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import { flex, circle } from "styled-system/patterns";
import type { ActivityWithStatus } from "~/types";
import { formatTime, getActivityDuration, formatDuration } from "~/lib/time";

const StatusBadge = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "bold",
  },
});

interface ActivityCardProps {
  activity: ActivityWithStatus;
  timeFormat: "12h" | "24h";
}

export function ActivityCard({ activity, timeFormat }: ActivityCardProps) {
  const isCurrent = activity.status === "current";
  const isPast = activity.status === "past";
  const duration = getActivityDuration(activity);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={flex({
        align: "center",
        gap: "4",
        px: isCurrent ? "6" : "4",
        py: isCurrent ? "6" : "4",
        borderRadius: "xl",
        bg: isPast ? "gray.100" : "white",
        borderWidth: isCurrent ? "3px" : "2px",
        borderStyle: "solid",
        borderColor: isCurrent ? activity.color : "gray.200",
        boxShadow: isCurrent ? `0 8px 24px -4px ${activity.color}40` : "sm",
        opacity: isPast ? 0.6 : 1,
        transform: isCurrent ? "scale(1.02)" : "scale(1)",
        transition: "all 0.3s ease",
      })}
    >
      <div className={flex({ direction: "column", align: "flex-start", gap: "1", minW: "80px" })}>
        <span
          className={css({
            fontSize: isCurrent ? "md" : "sm",
            fontWeight: "semibold",
            color: isPast ? "gray.400" : "gray.700",
          })}
        >
          {formatTime(activity.startTime, timeFormat)}
        </span>
        <span className={css({ fontSize: "xs", color: "gray.400" })}>
          {formatDuration(duration)}
        </span>
      </div>

      <motion.div
        animate={
          isCurrent
            ? {
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={
          isCurrent
            ? {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }
            : {}
        }
        className={css({ fontSize: isCurrent ? "4xl" : "2xl", lineHeight: 1 })}
      >
        {activity.icon}
      </motion.div>

      <div className={css({ flex: 1, minW: 0 })}>
        <h3
          className={css({
            fontFamily: "display",
            fontSize: isCurrent ? "xl" : "md",
            fontWeight: "semibold",
            color: isPast ? "gray.400" : "gray.900",
            margin: 0,
            marginBottom: "1",
          })}
        >
          {activity.name}
        </h3>
        {activity.description && (
          <p
            className={css({
              fontSize: "sm",
              color: "gray.500",
              margin: 0,
              lineHeight: "relaxed",
            })}
          >
            {activity.description}
          </p>
        )}

        {isCurrent && (
          <div className={css({ marginTop: "2" })}>
            <div className={css({ w: "full", h: "2", bg: "gray.200", borderRadius: "full", overflow: "hidden" })}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${activity.progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={css({ h: "full", borderRadius: "full" })}
                style={{ backgroundColor: activity.color }}
              />
            </div>
            <div className={flex({ justify: "space-between", marginTop: "1" })}>
              <span className={css({ fontSize: "xs", color: "gray.500" })}>{activity.progress}% done</span>
              <span className={css({ fontSize: "xs", color: "gray.500" })}>{formatTime(activity.endTime, timeFormat)}</span>
            </div>
          </div>
        )}
      </div>

      <StatusBadge
        bg={isCurrent ? activity.color : isPast ? "gray.300" : "gray.100"}
        color={isCurrent ? "white" : isPast ? "gray.400" : "gray.500"}
      >
        {isCurrent ? "✦" : isPast ? "✓" : "○"}
      </StatusBadge>
    </motion.div>
  );
}
