# DeafAuth Multi-Tenant Ecosystem

This repository contains the frontend, Edge/Deno functions, and backend workflows for the **multi-tenant DeafAuth ecosystem**, supporting:

- **Tenants:** `vr4deaf.org`, `mbtq.dev`, `360magicians.com`  
- **Centralized Auth:** DeafAuth with tenant-aware JWTs  
- **Frontends:** Vite-powered multi-tenant apps  
- **Backend:** Supabase/Postgres with RLS and service role functions  
- **Supporting Services:** AI microservices, analytics, caching, and public CDN  

---

## **Architecture Overview**

### **Layers**

1. **Tenant Entry Points**
   - Users navigate to tenant subdomains: `auth.vr4deaf.org`, `auth.mbq.dev`.
   - Vite frontend handles login and API calls.

2. **Edge Layer**
   - **Deno / Supabase Edge Functions** serve as `auth-proxy`.
   - Reads Host → resolves `tenant_id`.
   - Mints tenant-aware JWT (`sub`, `email`, `tenant_id`, `role`).
   - Optionally caches tenant mapping in Redis for performance.

3. **Core Services**
   - **Supabase/Postgres**
     - `user_profiles`, `tenants`, `user_tenants` tables.
     - Row-Level Security (RLS) enforces tenant isolation.
   - **Service Role Functions**
     - Server-side operations using `SUPABASE_SERVICE_ROLE_KEY`.
     - Mint JWTs, perform admin tasks, manage tenants.

4. **Supporting Services**
   - **Read Replicas:** analytics dashboards, reporting.
   - **AI Microservices:** IDEA Generator / Validator / Builder (Vertex AI / Cloud Run).
   - **Public Buckets / CDN:** static frontend assets (`mbtq-public`, `pinksync-public`).
   - **Cache:** Redis for tenant lookup or session caching.

---

## **User / Tenant Flow**

1. **Login Flow**
   - User visits tenant subdomain.
   - Frontend sends credentials to Edge Function.
   - Edge Function resolves tenant → verifies credentials → mints JWT.
   - Frontend stores JWT and uses it for API requests.
   - DB RLS enforces tenant isolation automatically.

2. **API / Data Access**
   - Frontend requests tenant-specific data.
   - JWT validated at Edge Function or backend API.
   - Supabase returns RLS-filtered data.

3. **Admin / Super-Admin**
   - JWT includes `role=admin`.
   - Edge Function bypasses tenant RLS when allowed.
   - Admin can perform cross-tenant operations.

4. **Public Assets**
   - Vite builds static assets.
   - Deployed to public buckets/CDN.
   - Frontend fetches dynamic tenant data via APIs.

5. **AI / Analytics**
   - Frontend sends tenant JWT → AI microservice.
   - Service generates output → writes tenant-scoped data if needed.
   - Results displayed in frontend dashboards.

---

## **Development Workflow**

1. **Code**
   - Frontend: Vite (`npm run dev` / `npm run build`)
   - Edge/Deno Functions: Typescript / JS
   - Supabase SQL / migrations

2. **CI/CD**
   - Lint and test frontend and Edge functions.
   - Build frontend → deploy static assets to bucket/CDN.
   - Deploy Edge/Deno functions → Supabase Edge or Deno Deploy.
   - Run DB migrations → Dev → Prod.

3. **Testing**
   - Tenant login / JWT issuance
   - RLS enforcement per tenant
   - API calls from frontend
   - Admin operations

---

## **Environment Variables**

| Name | Purpose |
|------|---------|
| `SUPABASE_URL` | URL for Supabase project |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for server-side operations |
| `JWT_SECRET` | Secret to sign tenant-aware JWTs |
| `REDIS_URL` | Optional cache for tenant mapping |
| `VITE_TENANT_API` | Frontend env: API endpoint per tenant |

---

## **Best Practices**

- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.  
- Use **tenant_id** in all tables with RLS.  
- Cache tenant lookup in Edge/Deno for performance.  
- Build separate frontend configs per tenant (env vars, branding).  
- Use read replicas for analytics dashboards and reporting.  
- Use AI/Cloud Run microservices for compute-heavy tasks.  

---

## **Future Enhancements**

- Cross-region read replicas for global latency optimization.  
- Multi-cloud Edge Functions if scaling beyond Supabase.  
- Dedicated DB per high-value tenant if needed.  
- Extend AI workflows with advanced analytics per tenant.

