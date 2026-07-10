import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Plus, Pencil } from "lucide-react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { styled } from "styled-system/jsx";
import { Button } from "~/components/ui";
import { useApp } from "~/context/AppContext";
import { DAY_NAMES, type Activity } from "~/types";
import { sortActivitiesByTime } from "~/lib/time";
import { ActivityForm } from "./ActivityForm";

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
  const { schedules, deleteActivity, copyDaySchedule, addActivity, updateActivity } = useApp();
  const day = parseInt(dayOfWeek || "0", 10);
  const schedule = schedules.find((s) => s.dayOfWeek === day);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  if (!schedule) {
    return (
      <div className={css({ p: "6", textAlign: "center" })}>
        <p className={css({ color: "gray.500" })}>Day not found</p>
        <Link to="/admin" className={css({ color: "primary.500" })}>Back to Admin</Link>
      </div>
    );
  }

  const sortedActivities = sortActivitiesByTime(schedule.activities);

  const handleAdd = () => {
    setEditingActivity(null);
    setIsFormOpen(true);
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  const handleSave = (activity: Activity) => {
    if (editingActivity) {
      updateActivity(day, editingActivity.id, activity);
    } else {
      addActivity(day, activity);
    }
    setIsFormOpen(false);
    setEditingActivity(null);
  };

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
            onClick={handleAdd}
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
                  _hover: { borderColor: "gray.300" },
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
                <div className={flex({ gap: "1", align: "center" })}>
                  <button
                    onClick={() => handleEdit(activity)}
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "full",
                      color: "gray.400",
                      cursor: "pointer",
                      _hover: { bg: "gray.100", color: "gray.600" },
                    })}
                    aria-label="Edit activity"
                  >
                    <Pencil style={{ width: "16px", height: "16px" }} />
                  </button>
                  <button
                    onClick={() => deleteActivity(day, activity.id)}
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "full",
                      color: "gray.400",
                      cursor: "pointer",
                      _hover: { bg: "red.50", color: "red.500" },
                    })}
                    aria-label="Delete activity"
                  >
                    <span className={css({ fontSize: "lg" })}>✕</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <ActivityForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSave}
        initialActivity={editingActivity || undefined}
      />
    </div>
  );
}
