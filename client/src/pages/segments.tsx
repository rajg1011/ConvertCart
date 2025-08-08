import React, { useState } from "react";
import type { Product } from "../types/type";
import Button from "../components/button";

const OPERATORS = ["=", "!=", ">", "<", ">=", "<="];

const Segments: React.FC = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const validateRules = (rules: string): string[] => {
    const errors: string[] = [];
    if (!rules.trim()) return [];

    const lines = rules.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (!line.trim()) return;

      const operatorCount = OPERATORS.reduce(
        (count, operator) => count + (line.split(operator).length - 1),
        0
      );

      if (operatorCount === 0) {
        errors.push(
          `Line ${index + 1}: No valid operator found (${OPERATORS.join(", ")})`
        );
        return;
      }

      if (operatorCount > 1) {
        errors.push(
          `Line ${
            index + 1
          }: Only one operator allowed per line (${OPERATORS.join(", ")})`
        );
        return;
      }

      let operatorFound = false;
      let left = "";
      let right = "";

      for (const op of OPERATORS) {
        const parts = line.split(op);
        if (parts.length === 2) {
          operatorFound = true;
          left = parts[0].trim();
          right = parts[1].trim();

          if (!left || !right) {
            errors.push(
              `Line ${
                index + 1
              }: Both sides of the operator must contain values`
            );
          }
          break;
        }
      }

      if (!operatorFound) {
        errors.push(
          `Line ${
            index + 1
          }: Invalid operator usage. Use one of: ${OPERATORS.join(", ")}`
        );
      }
    });

    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValidationErrors(validateRules(value));
  };

  const handleSubmit = async () => {
    try {
      setLoadingData(true);
      setError(false);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/segments/evaluate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userRules: inputValue }),
        }
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(true);
      setResults([]);
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mt-5 mx-auto p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Define Filter Conditions
        </h2>
        <label className="block mb-2 font-semibold">
          Enter filter rules (one per line):
        </label>
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          rows={8}
          className={`w-full border rounded p-3 mb-2 font-mono outline-none ${
            validationErrors.length > 0
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-gray-50 focus:border-blue-400"
          }`}
          placeholder="Enter one rule per line, e.g. price > 5000"
        />
        {validationErrors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {validationErrors.map((error, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{error}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mb-4 text-sm text-gray-500">
          <span className="font-medium">Examples:</span> price &gt; 5000,
          category = Smartphones, stock_status = instock
        </div>

        <div className="flex gap-2 mb-6">
          <Button
            type="button"
            className={`flex-1 text-white ${
              validationErrors.length > 0 || !inputValue.trim()
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleSubmit}
            disabled={validationErrors.length > 0 || !inputValue.trim()}
          >
            {loadingData ? "Loading..." : "Evaluate Filter"}
          </Button>
          <Button
            type="button"
            className="min-w-[200px] bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              setInputValue("");
              setValidationErrors([]);
              setResults([]);
              setError(false);
            }}
          >
            Reset
          </Button>
        </div>

        <div className="border-t pt-4 text-gray-700 text-sm">
          <span className="font-semibold mr-2">Supported operators:</span>
          {OPERATORS.map((operator, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 px-2 py-1 rounded mx-1"
            >
              {operator}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 mx-auto max-w-[50vw] mb-4">
        {results.length > 0 && (
          <pre className="mt-4 p-4  rounded shadow-2xl ">
            {JSON.stringify(results, null, 2)}
          </pre>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded shadow-2xl">
            Error in Loading.. Kindly Refresh the Page
          </div>
        )}
      </div>
    </>
  );
};

export default Segments;
