"""
seo_team.py — An AG2 (AutoGen 2) multi-agent SEO team.

Goal: type one prompt (e.g. "Reclaim our #1 ranking for '<keyword>' and win back
the Google knowledge panel"), and watch a team of AI specialists plan, write,
build, and QA the campaign together.

Setup (once):
    pip install ag2
    export OPENAI_API_KEY="sk-..."        # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."

Run:
    python seo_team.py

You are added to the room as a human. When the manager asks for approval or the
agents get stuck, they hand the mic to you. Type your reply; type "exit" to end.
"""

import os
from autogen import ConversableAgent, GroupChat, GroupChatManager, UserProxyAgent

# ---------------------------------------------------------------------------
# 1. LLM CONFIG
# ---------------------------------------------------------------------------
# One model shared by every agent. Swap the model or add more entries as you like.
llm_config = {
    "config_list": [
        {
            "model": "gpt-4o",
            "api_key": os.environ.get("OPENAI_API_KEY"),
        }
    ],
    "temperature": 0.4,
    "cache_seed": None,  # set an int to cache/replay runs; None = always fresh
}

# ---------------------------------------------------------------------------
# 2. THE AGENTS
#    `system_message` = the persona/prompt. `description` = how the manager
#    decides who speaks next, so keep descriptions short and role-focused.
# ---------------------------------------------------------------------------

seo_strategist = ConversableAgent(
    name="SEO_Strategist",
    llm_config=llm_config,
    description="Plans the campaign: keyword research, competitor-gap analysis, "
                "topical maps, site architecture. Speaks FIRST and reviews the final plan.",
    system_message=(
        "You are a senior SEO Strategist — the architect of the entire campaign.\n"
        "Given a target keyword/topic and a competitor to beat, you:\n"
        "1. Do keyword & intent research: primary keyword, secondary/long-tail, and "
        "the exact search intent behind them.\n"
        "2. Run a competitor-gap analysis: what the competitor's ranking page covers "
        "that ours doesn't, and where they're weak.\n"
        "3. Produce a topical map and the page/site architecture needed to win.\n"
        "4. Hand the Copywriter a clear brief: what to write, which keywords go where, "
        "word count, and the angle that beats the competitor.\n"
        "Be concrete and prioritized. When the team finishes, review the final output "
        "against the brief and say what still needs fixing."
    ),
)

copywriter = ConversableAgent(
    name="Copywriter",
    llm_config=llm_config,
    description="Writes the actual page copy from the Strategist's brief. "
                "Persuasive, conversion-optimized, keyword-aware.",
    system_message=(
        "You are a Master Direct-Response Copywriter and Conversion Strategist with "
        "deep expertise in consumer psychology, brand voice, and persuasive marketing.\n"
        "WORKFLOW every time:\n"
        "- Input Reception: acknowledge the Strategist's brief (target audience, keywords, goal).\n"
        "- Analysis: evaluate it against proven advertising frameworks and psychology principles.\n"
        "- Execution: write conversion-optimized copy that naturally works in the target keywords, "
        "following the requested format and brand voice.\n"
        "- Review & Refine: briefly note the psychological triggers used, state any assumptions, "
        "and offer one alternative headline for split-testing.\n"
        "Use clear headings. Keep the copy engaging and immediately usable — no filler. "
        "If crucial info (audience, benefits, CTA) is missing, ask for it before writing."
    ),
)

frontend_specialist = ConversableAgent(
    name="Frontend_Specialist",
    llm_config=llm_config,
    description="Turns the Copywriter's text into clean, fast, semantic HTML/CSS "
                "and an SEO-optimized sitemap. Handles XML/schema and structure.",
    system_message=(
        "You are an expert Frontend Software Engineer, XML Architecture Specialist, "
        "and UX Content Strategist.\n"
        "WORKFLOW:\n"
        "- Take the Copywriter's text and wrap it in clean, production-ready, semantic HTML "
        "with modular CSS and clear component separation.\n"
        "- If given an XML schema or page layout, parse its component hierarchy and return a "
        "text-based dictionary tree of the structure, then map the new brand into those slots.\n"
        "- Generate an SEO-optimized sitemap reflecting the most logical, persuasive navigation "
        "for the topic.\n"
        "- Add JSON-LD structured data (schema.org) so the page is eligible for rich results and "
        "the knowledge panel.\n"
        "Deliver copy-pasteable code blocks with inline comments. No filler. "
        "Ask for missing brand/structural details before finalizing."
    ),
)

link_builder = ConversableAgent(
    name="Link_Builder",
    llm_config=llm_config,
    description="Off-page SEO: backlink strategy, outreach angles, digital PR. "
                "Plans how to beat the competitor's referring domains.",
    system_message=(
        "You are a Link Builder / Digital PR Specialist. Off-page SEO is your domain — "
        "high-quality backlinks are what build Domain Authority and trust.\n"
        "Given the competitor's backlink profile (referring domains, total backlinks, link "
        "propensity), you:\n"
        "1. Identify the referring domains we should target — the same sites vouching for the "
        "competitor, plus better ones.\n"
        "2. Design an outreach plan: guest-post pitches, journalist/HARO angles, and digital-PR "
        "hooks tailored to the topic.\n"
        "3. Prioritize by likelihood-to-link (favor sites with high link propensity) and by "
        "authority.\n"
        "Output a concrete, prioritized target list and ready-to-send outreach templates."
    ),
)

data_analyst = ConversableAgent(
    name="Data_Analyst",
    llm_config=llm_config,
    description="Tracks performance and recommends pivots. Defines the KPIs and "
                "measurement plan; flags what to test.",
    system_message=(
        "You are a Data Analyst / Analytics Specialist. SEO is never 'set and forget' — "
        "it needs constant measurement and adjustment.\n"
        "You:\n"
        "1. Define the KPIs and how to track them (Google Analytics, Search Console, rank "
        "tracking) for this campaign.\n"
        "2. Specify what to monitor: target-keyword rank, impressions/CTR, bounce rate, Core "
        "Web Vitals, conversions.\n"
        "3. Propose A/B tests (e.g. on headlines the Copywriter provides) and define success "
        "criteria.\n"
        "4. Give data-backed recommendations on when to pivot.\n"
        "Be specific about metrics and thresholds, not vague."
    ),
)

ux_designer = ConversableAgent(
    name="UX_Designer",
    llm_config=llm_config,
    description="Reviews layout and user experience. Ensures low bounce rate and "
                "strong Core Web Vitals — the UX signals Google rewards.",
    system_message=(
        "You are a UX/UI Designer. Google rewards excellent user experience — low bounce "
        "rate and strong Core Web Vitals.\n"
        "Reviewing the Frontend Specialist's page and the Copywriter's content, you:\n"
        "1. Assess layout, visual hierarchy, and readability — is it intuitive and engaging?\n"
        "2. Recommend concrete changes that keep users on the page longer (structure, spacing, "
        "CTAs, above-the-fold priority).\n"
        "3. Flag anything hurting Core Web Vitals (layout shift, slow-loading blocks) and how "
        "to fix it.\n"
        "Give specific, actionable design notes the Frontend Specialist can implement."
    ),
)

# You — pulled into the room for approvals / when agents get stuck.
human = UserProxyAgent(
    name="You",
    human_input_mode="ALWAYS",
    code_execution_config=False,
    description="The human owner. Called in for approval, missing brand details, "
                "or when the team is stuck.",
)

# ---------------------------------------------------------------------------
# 3. TRANSITION GUARDRAILS (soft FSM)
#    Keeps six agents from talking over each other. Still dynamic — the manager
#    picks the next speaker, but only from the allowed list.
# ---------------------------------------------------------------------------
allowed_transitions = {
    seo_strategist:      [copywriter, link_builder, data_analyst, human],
    copywriter:          [seo_strategist, frontend_specialist],
    frontend_specialist: [ux_designer, seo_strategist],
    ux_designer:         [frontend_specialist, seo_strategist],
    link_builder:        [seo_strategist, data_analyst],
    data_analyst:        [seo_strategist, human],
    human:               [seo_strategist, copywriter, frontend_specialist,
                          link_builder, data_analyst, ux_designer],
}

# ---------------------------------------------------------------------------
# 4. THE GROUP CHAT + MANAGER
# ---------------------------------------------------------------------------
group_chat = GroupChat(
    agents=[seo_strategist, copywriter, frontend_specialist,
            ux_designer, link_builder, data_analyst, human],
    messages=[],
    max_round=30,
    speaker_selection_method="auto",          # manager LLM picks who's next
    allowed_or_disallowed_speaker_transitions=allowed_transitions,
    speaker_transitions_type="allowed",
)

manager = GroupChatManager(
    name="Campaign_Manager",
    groupchat=group_chat,
    llm_config=llm_config,
    system_message=(
        "You orchestrate an SEO campaign team. Read the conversation and pick the next "
        "logical speaker. Typical flow: Strategist plans -> Copywriter writes -> Frontend "
        "builds -> UX reviews -> Link Builder & Data Analyst plan off-page and measurement "
        "-> Strategist reviews. Loop back to fix issues. Call 'You' (the human) for approval "
        "or when stuck. End when the Strategist confirms the campaign is complete."
    ),
)

# ---------------------------------------------------------------------------
# 5. KICK IT OFF
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    TASK = (
        "We LOST our #1 Google ranking to a competitor and lost the right-side knowledge "
        "panel. Reclaim both.\n\n"
        "Fill in your details:\n"
        "- Target keyword: <YOUR KEYWORD>\n"
        "- Our URL: <YOUR URL>\n"
        "- Competitor URL: <COMPETITOR URL>\n"
        "- Competitor stats: DA 7, Spam 1%, Link Propensity 100%, Referring Domains 23, "
        "Total Backlinks 29\n"
        "- Our stats: DA 11, Spam 1%, Link Propensity 0.15%, Referring Domains 19, "
        "Total Backlinks 37\n\n"
        "Deliver: a topical plan, the page copy, production-ready HTML with schema markup, "
        "a UX review, a backlink/outreach plan, and a measurement plan."
    )

    human.initiate_chat(manager, message=TASK)
