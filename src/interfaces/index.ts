export interface DomainData {
    domain: string;
    registrar: string;
    creationDate: string;
    expirationDate: string;
    registrantName: string;
    adminEmail: string;
    techName: string;
    adminContactName: string;
    estimatedDomainAge: string,
    hostNames: string[]
  }
  
  export interface ErrorResponse {
    error: string;
  }
  