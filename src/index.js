"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
exports.Constants = {
    accessibility: {
        Enums: {},
    },
    ai_models: {
        Enums: {},
    },
    cron: {
        Enums: {},
    },
    deaf_ecosystem: {
        Enums: {
            organization_type: [
                "school",
                "university",
                "nonprofit",
                "technology_company",
                "consulting_firm",
                "research_center",
                "advocacy_group",
                "interpreting_service",
                "healthcare_provider",
                "cultural_center",
                "startup",
                "government_agency",
                "educational_resource",
                "accessibility_service",
            ],
            service_category: [
                "education",
                "employment",
                "healthcare",
                "legal_support",
                "technology",
                "communication_services",
                "arts_culture",
                "social_support",
                "research",
                "accessibility",
                "sign_language_resources",
            ],
        },
    },
    deaf_storage: {
        Enums: {},
    },
    deaf_video: {
        Enums: {
            match_status: [
                "pending",
                "accepted",
                "completed",
                "rejected",
                "in_progress",
            ],
            video_status: ["uploading", "processing", "ready", "matched", "archived"],
        },
    },
    deafauth: {
        Enums: {
            verification_level: [
                "open_community",
                "basic_verified",
                "community_trusted",
                "officially_verified",
            ],
        },
    },
    deafauth_oauth: {
        Enums: {},
    },
    deafauth_sso: {
        Enums: {},
    },
    ecosystem: {
        Enums: {},
    },
    ecosystem_identity: {
        Enums: {},
    },
    fibonrose: {
        Enums: {
            nft_category: [
                "art",
                "performance",
                "educational",
                "community",
                "accessibility",
                "sign_language",
                "deaf_culture",
            ],
            nft_status: ["minted", "listed", "transferred", "burned", "locked"],
            trust_level: ["unverified", "basic", "verified", "trusted", "elite"],
        },
    },
    fibronrose: {
        Enums: {},
    },
    graphql: {
        Enums: {},
    },
    graphql_public: {
        Enums: {},
    },
    magician_agents: {
        Enums: {},
    },
    magicians: {
        Enums: {},
    },
    mbtq: {
        Enums: {
            coverage_type: [
                "health",
                "life",
                "disability",
                "property",
                "vision",
                "dental",
            ],
            disadvantaged_status: [
                "Not Applicable",
                "Person with a Disability (including Deafness)",
                "Woman",
                "Service-Disabled Veteran",
                "Other Disadvantaged Group",
            ],
            filing_status: [
                "single",
                "married_joint",
                "married_separate",
                "head_of_household",
                "qualifying_widow",
            ],
            industry: [
                "Technology",
                "Healthcare",
                "Green Energy",
                "Manufacturing",
                "Accessibility Tech",
                "Education",
                "Retail",
            ],
            referral_status: [
                "pending",
                "contacted",
                "in_progress",
                "completed",
                "closed",
            ],
            sba_focus_area: [
                "SBIR/STTR (Research & Development)",
                "Deaf and Hard-of-Hearing Community",
                "8(a) Business Development",
                "Veteran-Owned",
                "General Loan",
            ],
            service_type: [
                "tax_preparation",
                "financial_planning",
                "insurance_consultation",
                "legal_advice",
            ],
        },
    },
    net: {
        Enums: {
            request_status: ["PENDING", "SUCCESS", "ERROR"],
        },
    },
    performance: {
        Enums: {},
    },
    pgmq_public: {
        Enums: {},
    },
    pinksync: {
        Enums: {},
    },
    public: {
        Enums: {
            accessibility_mode: ["ASL", "LSF", "BSL", "Captions", "Multilingual"],
            assistive_tech_preference: [
                "Hearing_Aid",
                "Cochlear_Implant",
                "Caption_Devices",
                "Visual_Alerts",
                "FM_System",
                "None",
            ],
            authmethod: [
                "email_password",
                "sso",
                "oauth_google",
                "oauth_microsoft",
                "sign_language_verification",
            ],
            AuthMethod: ["SUPABASE", "CLERK", "WALLET"],
            communication_mode: [
                "Sign_Language",
                "Oral",
                "Cued_Speech",
                "Total_Communication",
                "Bilingual",
                "Tactile_Sign",
            ],
            contract_status: [
                "draft",
                "pending",
                "active",
                "suspended",
                "completed",
                "disputed",
                "terminated",
            ],
            deafidentity: ["deaf", "hard_of_hearing", "hearing_ally", "interpreter"],
            DeafIdentity: ["BLACK_DEAF", "LATINX_DEAF", "OTHER"],
            interpretation_preference: [
                "Live_Interpreter",
                "Video_Relay",
                "Written_Translation",
                "AI_Translation",
                "None",
            ],
            sign_language_dialect: [
                "ASL",
                "BSL",
                "LSF",
                "DGS",
                "ISL",
                "LIBRAS",
                "CSL",
                "JSL",
                "SSL",
                "other",
            ],
            sign_language_preference: ["ASL", "BSL", "LSF", "CSL", "ISL", "Other"],
            sign_language_proficiency: [
                "none",
                "beginner",
                "conversational",
                "native",
                "professional",
            ],
            transaction_type: [
                "employment",
                "service",
                "product_sale",
                "intellectual_property",
                "collaboration",
                "real_estate",
                "investment",
                "educational",
                "healthcare",
                "creative_work",
                "deaf_community_service",
            ],
            trust_level: ["Basic", "Verified", "Trusted", "Admin"],
            verification_status: ["PENDING", "VERIFIED", "REJECTED"],
            video_status: ["uploaded", "processing", "transcribed", "error"],
        },
    },
    realtime: {
        Enums: {
            action: ["INSERT", "UPDATE", "DELETE", "TRUNCATE", "ERROR"],
            equality_op: ["eq", "neq", "lt", "lte", "gt", "gte", "in"],
        },
    },
    referrals: {
        Enums: {},
    },
    revenue: {
        Enums: {},
    },
    sign_language_support: {
        Enums: {},
    },
    staging_validation: {
        Enums: {},
    },
    storage: {
        Enums: {
            buckettype: ["STANDARD", "ANALYTICS"],
        },
    },
    supabase_functions: {
        Enums: {},
    },
    team_sync: {
        Enums: {},
    },
    tsaba: {
        Enums: {},
    },
    universal_contracts: {
        Enums: {},
    },
    user_metadata: {
        Enums: {
            communication_mode: [
                "ASL",
                "Signed English",
                "Oral",
                "Cued Speech",
                "Total Communication",
                "Tactile Sign",
                "Written Communication",
            ],
            deaf_identity: [
                "Deaf of Deaf",
                "Hearing Family",
                "Late Deafened",
                "Hard of Hearing",
                "Cochlear Implant Community",
                "Sign Language User",
                "Oral Deaf",
            ],
            hearing_status: [
                "Deaf",
                "Hard of Hearing",
                "Late Deafened",
                "Cochlear Implant User",
                "Hearing Aid User",
                "Hearing",
            ],
        },
    },
    vault: {
        Enums: {},
    },
    vr4deaf: {
        Enums: {
            accessibility_mode: [
                "asl",
                "bsl",
                "international_sign",
                "tactile_sign",
                "cued_speech",
                "visual_phonics",
            ],
            content_rating: ["general", "educational", "mature", "professional"],
            device_compatibility: [
                "oculus_quest",
                "htc_vive",
                "valve_index",
                "playstation_vr",
                "windows_mixed_reality",
                "mobile_ar",
            ],
            experience_type: [
                "educational",
                "social",
                "therapeutic",
                "professional_training",
                "cultural",
                "entertainment",
                "accessibility_simulation",
            ],
            interaction_type: [
                "avatar_interaction",
                "sign_language_chat",
                "gesture_recognition",
                "haptic_feedback",
                "lip_reading_simulation",
            ],
        },
    },
    web3: {
        Enums: {},
    },
};
