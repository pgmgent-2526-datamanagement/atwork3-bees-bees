"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

interface ObservationFormData {
  hiveId: string;
  beeCount: string;
  pollenColor: string;
  notes: string;
}

interface Hive {
  id: number;
  displayName: string;
}

interface ObservationFormProps {
  hives: Hive[];
  hiveId?: string;
}

export function ObservationForm({ hives, hiveId }: ObservationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<ObservationFormData>({
    hiveId: hiveId || "",
    beeCount: "",
    pollenColor: "",
    notes: "",
  });

  const handleChange =
    (field: keyof ObservationFormData) =>
    (
      e: React.ChangeEvent<
        HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/observations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hiveId: parseInt(formData.hiveId),
          beeCount: parseInt(formData.beeCount),
          pollenColor: formData.pollenColor,
          notes: formData.notes || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Kon observatie niet aanmaken");
      }

      router.push(`/hives/${formData.hiveId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis");
    } finally {
      setIsLoading(false);
    }
  };

  const hiveOptions = hives.map((hive) => ({
    value: hive.id.toString(),
    label: hive.displayName,
  }));

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} className="form">
        {error && <Alert variant="error">{error}</Alert>}

        <Select
          label="Bijenkast"
          value={formData.hiveId}
          onChange={handleChange("hiveId")}
          options={hiveOptions}
          placeholder="Selecteer een kast"
          required
        />

        <Input
          label="Aantal bijen"
          type="number"
          value={formData.beeCount}
          onChange={handleChange("beeCount")}
          placeholder="Geschat aantal bijen"
          min="0"
          required
        />

        <Input
          label="Stuifmeelkleur"
          type="text"
          value={formData.pollenColor}
          onChange={handleChange("pollenColor")}
          placeholder="Bijv. Geel, Oranje, Wit"
          required
        />

        <div className="input-group">
          <label htmlFor="notes" className="input-label">
            Notities
          </label>
          <textarea
            id="notes"
            className="input"
            value={formData.notes}
            onChange={handleChange("notes")}
            placeholder="Extra opmerkingen over deze observatie (optioneel)"
            rows={4}
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="form-actions">
          <Button type="submit" disabled={isLoading} fullWidth>
            {isLoading ? "Toevoegen..." : "Observatie toevoegen"}
          </Button>

          <Button href="/observations" variant="outline" fullWidth>
            Annuleren
          </Button>
        </div>
      </form>
    </div>
  );
}
