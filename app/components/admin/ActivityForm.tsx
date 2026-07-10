import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { styled } from "styled-system/jsx";
import { Button } from "~/components/ui";
import type { Activity, ActivityPreset } from "~/types";
import { COMMON_ACTIVITIES, DEFAULT_ACTIVITY_COLORS } from "~/types";
import { minutesToTime } from "~/lib/time";

const Overlay = styled("div", {
  base: {
    position: "fixed",
    inset: 0,
    bg: "black/50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
    p: "4",
  },
});

const Modal = styled("div", {
  base: {
    bg: "white",
    borderRadius: "2xl",
    width: "100%",
    maxW: "500px",
    maxH: "90vh",
    overflow: "auto",
    boxShadow: "xl",
  },
});

const ModalHeader = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: "6",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderColor: "gray.200",
  },
});

const ModalTitle = styled("h2", {
  base: {
    fontFamily: "display",
    fontSize: "xl",
    fontWeight: "bold",
    color: "gray.900",
  },
});

const CloseButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "full",
    color: "gray.500",
    cursor: "pointer",
    _hover: { bg: "gray.100", color: "gray.700" },
  },
});

const ModalBody = styled("div", {
  base: {
    p: "6",
    display: "flex",
    flexDirection: "column",
    gap: "4",
  },
});

const Field = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5",
  },
});

const Label = styled("label", {
  base: {
    fontSize: "sm",
    fontWeight: "medium",
    color: "gray.700",
  },
});

const Input = styled("input", {
  base: {
    width: "full",
    px: "4",
    py: "2.5",
    borderRadius: "lg",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "gray.200",
    fontSize: "md",
    color: "gray.900",
    _focus: {
      borderColor: "primary.400",
      outline: "none",
    },
    _placeholder: {
      color: "gray.400",
    },
  },
});

const Select = styled("select", {
  base: {
    width: "full",
    px: "4",
    py: "2.5",
    borderRadius: "lg",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "gray.200",
    fontSize: "md",
    color: "gray.900",
    bg: "white",
    cursor: "pointer",
    appearance: "none",
    _focus: {
      borderColor: "primary.400",
      outline: "none",
    },
  },
});

const ColorGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "2",
  },
});

const ColorOption = styled("button", {
  base: {
    width: "full",
    aspectRatio: "1",
    borderRadius: "full",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "transparent",
    cursor: "pointer",
    transition: "all 0.15s ease",
    _hover: {
      transform: "scale(1.1)",
    },
  },
});

const IconGrid = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "2",
  },
});

const IconOption = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "full",
    aspectRatio: "1",
    borderRadius: "lg",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "gray.200",
    bg: "white",
    fontSize: "xl",
    cursor: "pointer",
    transition: "all 0.15s ease",
    _hover: {
      bg: "gray.50",
      transform: "scale(1.05)",
    },
  },
});

const TimeRow = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "2",
    alignItems: "center",
  },
});

const PresetButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "2",
    px: "3",
    py: "2",
    borderRadius: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "gray.200",
    bg: "white",
    fontSize: "sm",
    cursor: "pointer",
    _hover: {
      bg: "gray.50",
      borderColor: "primary.300",
    },
  },
});

interface ActivityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  initialActivity?: Activity;
}

const AVAILABLE_ICONS = [
  "🌅", "🥞", "🪥", "🎒", "📚", "🍎", "🎨", "🧩", "🎵", "⚽",
  "🍽️", "🛁", "📖", "🌙", "😴", "🧹", "📺", "🎮", "🌳", "👕",
  "🏃", "🚲", "🎭", "🎪", "🏠", "🐶", "🐱", "🌈", "⭐", "🎈",
];

export function ActivityForm({
  isOpen,
  onClose,
  onSave,
  initialActivity,
}: ActivityFormProps) {
  const [name, setName] = useState(initialActivity?.name || "");
  const [startTime, setStartTime] = useState(initialActivity?.startTime || "08:00");
  const [endTime, setEndTime] = useState(initialActivity?.endTime || "08:30");
  const [color, setColor] = useState(initialActivity?.color || DEFAULT_ACTIVITY_COLORS[0]);
  const [icon, setIcon] = useState(initialActivity?.icon || "🌅");
  const [description, setDescription] = useState(initialActivity?.description || "");
  const [showPresets, setShowPresets] = useState(false);

  const handlePresetSelect = (preset: ActivityPreset) => {
    setName(preset.name);
    setColor(preset.color);
    setIcon(preset.icon);
    const startMinutes = timeToMinutes(startTime);
    setEndTime(minutesToTime(startMinutes + preset.duration));
    setShowPresets(false);
  };

  const handleSubmit = () => {
    const activity: Activity = {
      id: initialActivity?.id || `act-${Date.now()}`,
      name,
      startTime,
      endTime,
      color,
      icon,
      description: description || undefined,
      playSound: initialActivity?.playSound ?? true,
    };
    onSave(activity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {initialActivity ? "Edit Activity" : "Add Activity"}
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <X style={{ width: "20px", height: "20px" }} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <Field>
            <Label>Quick Select</Label>
            <button
              onClick={() => setShowPresets(!showPresets)}
              className={css({
                width: "full",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: "4",
                py: "2.5",
                borderRadius: "lg",
                borderWidth: "2px",
                borderStyle: "dashed",
                borderColor: "primary.300",
                bg: "primary.50",
                color: "primary.700",
                fontSize: "md",
                fontWeight: "medium",
                cursor: "pointer",
                _hover: { bg: "primary.100" },
              })}
            >
              <span>Choose a common activity... </span>
              <ChevronDown
                style={{
                  width: "20px",
                  height: "20px",
                  transform: showPresets ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </button>
            {showPresets && (
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "2",
                  mt: "2",
                  maxH: "200px",
                  overflow: "auto",
                  p: "2",
                  bg: "gray.50",
                  borderRadius: "lg",
                })}
              >
                {COMMON_ACTIVITIES.map((preset) => (
                  <PresetButton
                    key={preset.name}
                    onClick={() => handlePresetSelect(preset)}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.name}</span>
                  </PresetButton>
                ))}
              </div>
            )}
          </Field>

          <Field>
            <Label>Activity Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Breakfast, School, Play Time"
            />
          </Field>

          <Field>
            <Label>Time</Label>
            <TimeRow>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  const newStart = timeToMinutes(e.target.value);
                  const currentDuration = timeToMinutes(endTime) - timeToMinutes(startTime);
                  setEndTime(minutesToTime(newStart + currentDuration));
                }}
              />
              <span className={css({ color: "gray.400", fontSize: "sm" })}>to</span>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </TimeRow>
          </Field>

          <Field>
            <Label>Color</Label>
            <ColorGrid>
              {DEFAULT_ACTIVITY_COLORS.map((c) => (
                <ColorOption
                  key={c}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  className={css({
                    borderColor: color === c ? "gray.900" : "transparent",
                  })}
                />
              ))}
            </ColorGrid>
          </Field>

          <Field>
            <Label>Icon</Label>
            <IconGrid>
              {AVAILABLE_ICONS.map((i) => (
                <IconOption
                  key={i}
                  onClick={() => setIcon(i)}
                  className={css({
                    borderColor: icon === i ? "primary.500" : "gray.200",
                    bg: icon === i ? "primary.50" : "white",
                  })}
                >
                  {i}
                </IconOption>
              ))}
            </IconGrid>
          </Field>

          <Field>
            <Label>Description (optional)</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about this activity"
            />
          </Field>
        </ModalBody>

        <div
          className={css({
            display: "flex",
            gap: "3",
            p: "6",
            pt: 0,
          })}
        >
          <Button
            size="lg"
            colorPalette="orange"
            className={css({ flex: 1 })}
            onClick={handleSubmit}
          >
            {initialActivity ? "Update Activity" : "Add Activity"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </Overlay>
  );
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
