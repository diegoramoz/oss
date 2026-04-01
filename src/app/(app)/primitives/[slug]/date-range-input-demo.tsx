"use client";

import { z } from "zod/v4";
import { Form, useAppForm } from "@/components/form";

const schema = z.object({
  value: z
    .object({ from: z.date(), to: z.date() })
    .meta({ label: "Date Range" }),
});

export function DateRangeInputDemo() {
  const form = useAppForm({
    defaultValues: {
      value: undefined as unknown as { from: Date; to: Date },
    },
    validators: { onChange: schema },
    onSubmit: async () => {
      // demo only — no submission action
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppField name="value">
        {(field) => <field.DateRangeInput schema={schema.shape.value} />}
      </form.AppField>
    </Form>
  );
}
