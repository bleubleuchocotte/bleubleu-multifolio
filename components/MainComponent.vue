<script setup lang="ts">
import { ProjectType } from "~/type/types";

const projects: ProjectType[] = [
  {
    name: "Projet 1",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 2",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 3",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 4",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 5",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 6",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 7",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 8",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 9",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 10",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
  {
    name: "Projet 1",
    year: 2023,
    about: {
      skills: [
        "Compétence 1",
        "Compétence 2",
        "Jeux",
        "Vidéos",
        "Débat",
        "Compétence 1",
        "Compétence 1",
      ],
      content:
        "Yorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, inar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentessuscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      },
    ],
  },
];

const projectActive = ref<ProjectType>(projects[0]);
</script>

<template>
  <main>
    <ProjectList
      class="project-lists"
      :projects="projects"
      @project="(el) => (projectActive = el)"
    />
    <ProjectAbout class="project-about" :project="projectActive" />
    <ProjectImages class="project-images" :project="projectActive" />
    <ServicesList class="services-lists" />
    <AboutMe class="about-me" />
  </main>
</template>

<style scoped lang="scss">
main {
  flex: 1;
  height: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
}

.project-lists {
  grid-area: 1 / 1 / 3 / 2;
  border-right: 1px solid $border-color;
}

.project-about {
  grid-area: 1 / 2 / 3 / 3;
}

.services-lists {
  grid-area: 1 / 3 / 4 / 4;
  border: 1px solid $border-color;
  border-top: none;
}

.project-images {
  grid-area: 3 / 1 / 6 / 3;
}

.about-me {
  grid-area: 4 / 3 / 6 / 4;
  border: 1px solid $border-color;
  border-top: none;
}
</style>
