import { z } from "zod";

const operatorSchema = z.enum(["=", "!=", ">", "<", ">=", "<="]);

const ruleSchema = z.object({
  field: z.string().min(1, "Field name is required"),
  operator: operatorSchema,
  value: z.union([z.string(), z.number(), z.boolean(), z.null()]),
});

type ParsedQuery = Record<string, string | number | boolean | null | object>;

const parseRules = (userRules: string): ParsedQuery => {
  const query: ParsedQuery = {};
  const lines = userRules.split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const matchCondition = trimmedLine.match(
      /^(\w+)\s*(=|!=|>=|<=|>|<)\s*(.+)$/
    );
    if (!matchCondition) {
      throw new Error("Invalid rule format");
    }

    const [fullMatch, queryField, operator, rawValueOfCondition] =
      matchCondition;

    if (!queryField || !operator || !rawValueOfCondition) {
      throw new Error("Invalid rule format");
    }

    let value: string | number | boolean | null = rawValueOfCondition.trim();

    if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (value === "null") value = null;
    else if (!isNaN(Number(value))) value = parseFloat(value);

    ruleSchema.parse({
      field: queryField,
      operator,
      value,
    });

    switch (operator) {
      case "=":
        query[queryField] = value;
        break;
      case "!=":
        query[queryField] = { $ne: value };
        break;
      case ">":
        query[queryField] = { $gt: value };
        break;
      case ">=":
        query[queryField] = { $gte: value };
        break;
      case "<":
        query[queryField] = { $lt: value };
        break;
      case "<=":
        query[queryField] = { $lte: value };
        break;
    }
  }

  return query;
};

export default parseRules;
