export interface AccountSourcesResponse {
  id: number | string;
  type: string;
  name: string;
  alternativeName: string;
  region: string;
  country: string;
  website: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export class AddAccountSource {
  type = "";
  name = "";
  alternativeName = "";
  region = "";
  country = "";
  website = "";
  email = "";
  createdAt = "";
  updatedAt = "";
}
