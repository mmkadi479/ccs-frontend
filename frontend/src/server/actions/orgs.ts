'use server'

import { env } from "~/env";
import { DATA_TAGS } from "~/lib/constants";

const BASE_URL = env.API_URL;

export interface publicOrg {
  id: number;
  name: string;
  email: string;
  orgName: string;
}

export async function getOrg(orgId: number) {
  const res = await fetch(`${BASE_URL}${orgId}`, {
    next: { tags: [DATA_TAGS.org] },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch org");
  }

  const org: publicOrg = await res.json();

  return org;  
}