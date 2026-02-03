
import json
import os

# Paths
NEXT_JSON_PATH = r"c:\Repos\com.daltonponder_next\website\messages\en.json"
NUXT_JSON_PATH = r"c:\Repos\com.daltonponder_nuxt\assets\skillsSection\TechStackAndSkills_en.json"

# Category Mapping
CATEGORY_MAP = {
    "Programming & Languages": "Languages",
    "Frameworks & Libraries": "Frontend", # Can be Backend, but defaulting to Frontend
    "Tools & Platforms": "DevOps",
    "CMS Platforms": "Backend",
    "Development Practices": "Practices",
    "Systems & Infrastructure": "DevOps",
    "Soft Skills & Work Ethic": "Soft Skills"
}

def merge_skills():
    # Load Next.js JSON
    with open(NEXT_JSON_PATH, 'r', encoding='utf-8') as f:
        next_data = json.load(f)

    existing_list = next_data['Home']['SkillsSection']['List']
    existing_names = {s['name'].lower() for s in existing_list}

    # Load Nuxt JSON
    with open(NUXT_JSON_PATH, 'r', encoding='utf-8') as f:
        nuxt_data = json.load(f)

    new_skills_count = 0

    for nuxt_cat, skills in nuxt_data.items():
        target_cat = CATEGORY_MAP.get(nuxt_cat, "Other")
        
        for skill_name in skills:
            if skill_name.lower() not in existing_names:
                # Add new skill
                new_skill = {
                    "name": skill_name,
                    "icon": "tabler:circle-check", # Default icon
                    "category": target_cat,
                    "years": 1,         # Default
                    "proficiency": 50   # Default
                }
                existing_list.append(new_skill)
                existing_names.add(skill_name.lower())
                new_skills_count += 1
                print(f"Added: {skill_name} ({target_cat})")

    # Save updated JSON
    next_data['Home']['SkillsSection']['List'] = existing_list
    
    with open(NEXT_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(next_data, f, indent=4)
        
    print(f"\nSuccessfully merged {new_skills_count} new skills.")

if __name__ == "__main__":
    merge_skills()
