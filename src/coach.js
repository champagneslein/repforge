import { llmJson } from './api';

// The overarching AI coach: sees the trainee's whole world — knowledge grade,
// every scored call, activity across channels, pipeline health — and produces
// a coaching review with wins, misses, trends, and drills to run next.

export function buildTraineeDossier({ product, setupGrade, deals, state, simDay, scheduledCalls, companies }) {
  const calls = [];
  (deals || []).forEach(d => (d.callLogs || []).forEach(log => {
    calls.push({
      persona: d.persona_name, company: d.company_name, stage: d.stage,
      when: log.called_at, interest: log.interest_score_after,
      summary: log.ai_summary || '', objections: log.objections || [],
      scores: log.ai_scores ? { overall: log.ai_scores.overall, grade: log.ai_scores.grade, dims: (log.ai_scores.dimensions || []).map(x => x.label + ':' + x.score) } : null,
    });
  }));
  calls.sort((a, b) => new Date(a.when) - new Date(b.when));

  const st = state || {};
  const ids = Object.keys(st);
  const emailsSent = ids.reduce((n, id) => n + (st[id]?.emailCount || 0), 0);
  const emailReplies = ids.filter(id => st[id]?.emailStatus === 'replied').length;
  const connects = ids.filter(id => (st[id]?.linkedinStatus || 'none') !== 'none').length;
  const meetings = ids.filter(id => st[id]?.meetingStatus === 'booked').length;
  const dials = ids.reduce((n, id) => n + (st[id]?.calls || 0), 0);

  const stages = {};
  (deals || []).forEach(d => { stages[d.stage] = (stages[d.stage] || 0) + 1; });
  const closedValue = (deals || []).filter(d => d.stage === 'Closed Won')
    .reduce((sum, d) => sum + ((companies || []).find(c => c.name === d.company_name)?.dealValue || 0), 0);

  return {
    simDay,
    product_name: product?.product_name || null,
    knowledge_grade: setupGrade ? { grade: setupGrade.grade, overall: setupGrade.overall, weak_areas: (setupGrade.sections || []).filter(s => s.score < 7).map(s => s.area), focus: setupGrade.focus || [] } : null,
    activity: { dials, emails_sent: emailsSent, email_replies: emailReplies, prolink_touches: connects, meetings_booked: meetings, upcoming_calls: (scheduledCalls || []).filter(c => c.status === 'scheduled').length },
    pipeline: { stages, closed_value: closedValue, deals: (deals || []).length },
    scored_calls: calls.slice(-12),
  };
}

export async function runCoachReview(dossier) {
  return llmJson(
    'You are an elite sales coach reviewing a trainee on an AI sales training platform. Below is their full dossier: product knowledge grade, activity metrics, pipeline, and their scored practice calls in chronological order (each call was scored 0-10 per dimension by a call analyst).\n\n'
    + 'DOSSIER:\n' + JSON.stringify(dossier)
    + '\n\nWrite a coaching review. Judge effort (activity), skill (call scores and their trend over time), knowledge (grade and weak areas), and outcomes (pipeline). Be specific and reference actual calls/numbers — never generic advice. If there is too little data, say what to go do first.\n\n'
    + 'Return JSON exactly: {"grade":"A|B|C|D|F","overall":0-100,"headline":"<one punchy sentence>","wins":["<specific win>","..."],"misses":["<specific miss>","..."],"trends":["<pattern across calls, improving or declining>","..."],"drills":[{"drill":"<concrete exercise to do next in the simulator>","why":"<1 sentence>"}],"knowledge_note":"<1-2 sentences tying their product knowledge gaps to what happened on calls>"}',
    1600
  );
}
