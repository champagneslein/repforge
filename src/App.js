import React, { useState } from "react";

// ─────────────────────────────────────────────
// COMPANY + EMPLOYEE DATA
// ─────────────────────────────────────────────
const companies = [
  { id:1,  name:"Nexaflow",         industry:"SaaS",           size:"Enterprise", employees:42, domain:"nexaflow.io",         description:"Cloud workflow automation for enterprise ops teams",        location:"Dublin" },
  { id:2,  name:"CloudPulse",       industry:"SaaS",           size:"Mid-Market", employees:25, domain:"cloudpulse.io",       description:"Real-time analytics and monitoring SaaS",                  location:"London" }