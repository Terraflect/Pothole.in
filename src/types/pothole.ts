export type PotholeSeverity = 'dangerous' | 'moderate' | 'low';

export type PotholeStatus = 'under_review' | 'escalated' | 'assigned' | 'resolved';

export interface PotholeLocation {
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export interface PotholeReport {
  id: string;
  reportCode: string;
  imageUrl: string;
  location: PotholeLocation;
  roadName: string;
  nearbyLandmark: string;
  severity: PotholeSeverity;
  status: PotholeStatus;
  description: string;
  estimatedDepthCm: number;
  trafficImportance: number; // 1 - 10
  upvotes: number;
  userUpvoted?: boolean;
  reporterName: string;
  createdAt: string;
  updatedAt: string;
  wardInfo: {
    wardName: string;
    municipalBody: string; // e.g. BBMP, BMC, GHMC, PMC, MCD
    officerInCharge?: string;
    escalatedAt?: string;
    contractorAssigned?: string;
  };
  resolvedAt?: string;
  resolvedImageUrl?: string;
  resolutionSummary?: string;
  safetyRating?: number;
}

export interface CityStat {
  name: string;
  state: string;
  activeReports: number;
  resolvedReports: number;
  responseRate: string;
  center: { lat: number; lng: number };
}
