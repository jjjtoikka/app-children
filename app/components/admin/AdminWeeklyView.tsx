import { Link } from "react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { styled } from "styled-system/jsx";
import { useApp } from "~/context/AppContext";
import { DAY_SHORT_NAMES, DAY_NAMES } from "~/types";

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

const PageTitle = styled("h1", {
  base: {
    fontFamily: "display",
    fontSize: "2xl",
    fontWeight: "bold",
    color: "gray.900",
    margin: 0,
  },
});

const PageSubtitle = styled("p", {
  base: {
    fontSize: "sm",
    color: "gray.500",
    margin: 0,
    mt: "0.5",
  },
});

const BackButton = styled(Link, {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "full",
    bg: "gray.100",
    color: "gray.500",
    flexShrink: 0,
    _hover: { bg: "gray.200" },
  },
});

const DayCard = styled(Link, {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "4",
    p: "5",
    bg: "white",
    borderRadius: "xl",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "gray.200",
    textDecoration: "none",
    transition: "all 0.2s ease",
    _hover: {
      borderColor: "primary.300",
      boxShadow: "md",
    },
  },
});

const DayAvatar = styled("div", {
  base: {
    width: "48px",
    height: "48px",
    borderRadius: "xl",
    bg: "primary.50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "xl",
    fontWeight: "bold",
    color: "primary.500",
    flexShrink: 0,
  },
});

const DayName = styled("div", {
  base: {
    fontFamily: "display",
    fontSize: "lg",
    fontWeight: "semibold",
    color: "gray.900",
    marginBottom: "1",
  },
});

const DayMeta = styled("div", {
  base: {
    fontSize: "sm",
    color: "gray.500",
  },
});

export function AdminWeeklyView() {
  const { schedules } = useApp();

  return (
    <div className={flex({ direction: "column", minH: "100vh", bg: "gray.50", gap: 0 })}>
      <Header>
        <BackButton to="/">
          <ArrowLeft style={{ width: "20px", height: "20px" }} />
        </BackButton>
        <div>
          <PageTitle>Weekly Schedule</PageTitle>
          <PageSubtitle>Tap a day to edit activities</PageSubtitle>
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
          {schedules.map((schedule) => (
            <DayCard key={schedule.dayOfWeek} to={`/admin/day/${schedule.dayOfWeek}`}>
              <DayAvatar>{DAY_SHORT_NAMES[schedule.dayOfWeek][0]}</DayAvatar>

              <div className={css({ flex: 1, minW: 0 })}>
                <DayName>{DAY_NAMES[schedule.dayOfWeek]}</DayName>
                <DayMeta>
                  {schedule.activities.length === 0
                    ? "No activities"
                    : `${schedule.activities.length} activity${schedule.activities.length !== 1 ? "ies" : "y"}`}
                  {schedule.activities.length > 0 &&
                    ` · ${schedule.activities[0].startTime} - ${schedule.activities[schedule.activities.length - 1].endTime}`}
                </DayMeta>
              </div>

              <ChevronRight
                style={{
                  width: "20px",
                  height: "20px",
                  color: "#d1d5db",
                  flexShrink: 0,
                }}
              />
            </DayCard>
          ))}
        </div>
      </main>
    </div>
  );
}
