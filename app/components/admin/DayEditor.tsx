import { useParams, Link } from "react-router";
import { ArrowLeft, Plus } from "lucide-react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { styled } from "styled-system/jsx";
import { Button } from "~/components/ui";
import { useApp } from "~/context/AppContext";
import { DAY_NAMES } from "~/types";
import { sortActivitiesByTime } from "~/lib/time";

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
    gap: "4",
  },
});

export function DayEditor() {
  const { dayOfWeek } = useParams();
  const { schedules, deleteActivity, copyDaySchedule, addActivity } = useApp();
  const day = parseInt(dayOfWeek || "0", 10);
  const schedule = schedules.find((s) => s.dayOfWeek === day);

  if (!schedule) {
    return (
      <div className={css({ p: "6", textAlign: "center" })}>
        <p className={css({ color: "gray.500" })}>Day not found</p>
        <Link to="/admin" className={css({ color: "primary.500" })}>Back to Admin</Link>
      </div>
    );
  }

  const sortedActivities = sortActivitiesByTime(schedule.activities);

  return (
    <div className={flex({ direction: "column", minH: "100vh", bg: "gray.50", gap: 0 })}>
      <Header>
        <Link
          to="/admin"
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "full",
            bg: "gray.100",
            color: "gray.500",
            _hover: { bg: "gray.200" },
          })}
        >
          <ArrowLeft style={{ width: "20px", height: "20px" }} />
        </Link>
        <div>
          <h1
            className={css({
              fontFamily: "display",
              fontSize: "2xl",
              fontWeight: "bold",
              color: "gray.900",
              margin: 0,
            })}
          >
            {DAY_NAMES[day]}
          </h1>
          <p className={css({ fontSize: "sm", color: "gray.500", margin: 0 })}>
            {sortedActivities.length} activities
          </p>
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
        <div className={flex({ direction: "column", gap: "3", align: "stretch" })}>
          <Button
            size="lg"
            colorPalette="orange"
            className={css({ mb: "4" })}
          >
            <Plus style={{ width: "20px", height: "20px" }} />
            Add Activity
          </Button>

          {sortedActivities.length === 0 ? (
            <div
              className={css({
                textAlign: "center",
                p: "12",
                color: "gray.500",
              })}
            >
              <div className={css({ fontSize: "4xl", mb: "4" })}>📅</div>
              <p>No activities yet. Add your first one!</p>
            </div>
          ) : (
            sortedActivities.map((activity) => (
              <div
                key={activity.id}
                className={css({
                  display: "flex",
                  alignItems: "center",
                  gap: "4",
                  p: "4",
                  bg: "white",
                  borderRadius: "xl",
                  borderWidth: "2px",
                  borderColor: "gray.200",
                })}
              >
                <div
                  className={css({
                    fontSize: "2xl",
                    width: "40px",
                    textAlign: "center",
                  })}
                >
                  {activity.icon}
                </div>
                <div className={css({ flex: 1, minW: 0 })}>
                  <div
                    className={css({
                      fontWeight: "semibold",
                      color: "gray.900",
                    })}
                  >
                    {activity.name}
                  </div>
                  <div className={css({ fontSize: "sm", color: "gray.500" })}>
                    {activity.startTime} - {activity.endTime}
                  </div>
                </div>
                <button
                  onClick={() => deleteActivity(day, activity.id)}
                  className={css({
                    color: "gray.400",
                    _hover: { color: "red.500" },
                    cursor: "pointer",
                  })}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
