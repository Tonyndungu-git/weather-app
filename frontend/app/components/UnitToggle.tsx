"use client";

type Props = {
  unit: "metric" | "imperial";
  onToggle: (unit: "metric" | "imperial") => void;
};

export default function UnitToggle({ unit, onToggle }: Props) {
  return (
    <div className="flex gap-2">
      <button
        className={`btn ${unit === "metric" ? "btn-primary" : "btn-outline"}`}
        onClick={() => onToggle("metric")}
      >
        °C
      </button>
      <button
        className={`btn ${unit === "imperial" ? "btn-primary" : "btn-outline"}`}
        onClick={() => onToggle("imperial")}
      >
        °F
      </button>
    </div>
  );
}
