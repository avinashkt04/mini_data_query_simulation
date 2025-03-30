import { Request, Response } from "express";
import queryMap from "../../mocks/query-map.json";
import { getLastQuery, storeQuery } from "../utils/querySession";

// This function handles the query submission from the user
const handleQuery = async (req: Request, res: Response): Promise<void> => {
  const { query }: { query: keyof typeof queryMap } = req.body;

  if (!query) {
    res.status(400).json({ message: "Query is required" });
    return;
  }

  // Check if the query is interpretable or not
  const queryMeta = queryMap[query];

  if (!queryMeta) {
    res.status(422).json({ message: "Query not Interpretable." });
    return;
  }

  // store the query and returning a confirmation message
  storeQuery(query);
  res.json({ message: "Query stored successfully" });
  return;
};

// This function explains the last query submitted by the user
const explainQuery = async (req: Request, res: Response): Promise<void> => {
  // get the last query from the stored queries
  const query = getLastQuery() as keyof typeof queryMap;

  if (!query) {
    res.status(400).json({ message: "No query has been submitted yet." });
    return;
  }

  // Check if the query is interpretable or not
  const queryMeta = queryMap[query];

  if (!queryMeta) {
    res.status(422).json({ message: "Query not Interpretable." });
    return;
  }

  // check if the query has any filters in it
  let filters: string[] = [];

  if(queryMeta.sql.includes("WHERE")) {
    const whereMatch = queryMeta.sql.match(/WHERE (.+)/i);
    if (whereMatch) filters.push(whereMatch[1]);
  }

  // check the columns required by the query
  let columns: string[] = [];

  if(queryMeta.sql.includes("SELECT *")) {
    columns.push("All columns");
  } else {
    const selectMatch = queryMeta.sql.match(/SELECT (.+) FROM/i);
    if (selectMatch) {
      columns = selectMatch[1].split(",").map((col) => col.trim());
    }
  }

  // check the query has any group by clause
  let groupBy: string[] = [];

  if(queryMeta.sql.includes("GROUP BY")) {
    const groupByMatch = queryMeta.sql.match(/GROUP BY (.+)/i);
    if (groupByMatch) groupBy.push(...groupByMatch[1].split(",").map((col) => col.trim()));
  }

  res.status(200).json({
    originalQuery: query,
    interpretedQuery: queryMeta.sql,
    type: queryMeta.type,
    table: queryMeta.table,
    filters,
    columns,
    groupBy,
  })
  return;
};

// This function checks if the last query submitted by the user is valid and feasible
const validQuery = async (req: Request, res: Response): Promise<void> => {
  // get the last query from the stored queries
  const query = getLastQuery() as keyof typeof queryMap;

  if (!query) {
    res.status(400).json({ message: "No query has been submitted yet." });
    return;
  }

  // Check if the query is interpretable or not
  const queryMeta = queryMap[query];

  if (!queryMeta) {
    res.status(422).json({ message: "Query not Interpretable." });
    return;
  }

  res.status(200).json({
    message: "Query is valid and feasible.",
    result: queryMeta.result
  })
  return;
}

export { handleQuery, explainQuery, validQuery };
