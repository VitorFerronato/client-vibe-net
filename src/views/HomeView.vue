<template>
  <div>
    <header class="app-header">
      <v-container fluid class="d-flex align-center">
        <div class="d-flex align-center">
          <h1 class="text-h5 font-weight-bold primary--text mr-4">VibeNet</h1>
          <v-text-field
            density="compact"
            variant="outlined"
            placeholder="Search..."
            prepend-inner-icon="mdi-magnify"
            class="search-bar"
            hide-details
            bg-color="white"
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <v-btn icon class="mr-2">
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
          <v-btn icon class="mr-2">
            <v-icon>mdi-message-outline</v-icon>
          </v-btn>
          <v-btn icon @click="$router.push('/sign-out')">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </v-container>
    </header>

    <v-main class="bg-background">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-card class="pa-4">
              <div class="d-flex align-center mb-6">
                <v-avatar size="50" color="primary" class="mr-3">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
                <div>
                  <div class="font-weight-bold">John Doe</div>
                  <div class="text-caption">@johndoe</div>
                </div>
              </div>

              <v-list nav density="compact">
                <v-list-item
                  prepend-icon="mdi-home"
                  title="Home"
                  value="home"
                  active
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-account-group"
                  title="Friends"
                  value="friends"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-bookmark-outline"
                  title="Saved"
                  value="saved"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-image-multiple"
                  title="Photos"
                  value="photos"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-calendar"
                  title="Events"
                  value="events"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-cog"
                  title="Settings"
                  value="settings"
                ></v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="mb-4 pa-4">
              <div class="d-flex align-start">
                <v-avatar size="40" color="primary" class="mr-3">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
                <v-text-field
                  v-model="newPost.content"
                  placeholder="What's on your mind?"
                  variant="outlined"
                  hide-details
                  class="flex-grow-1"
                ></v-text-field>
              </div>
              <v-divider class="my-3"></v-divider>
              <div class="d-flex justify-space-between">
                <v-btn prepend-icon="mdi-image" variant="text">Photo</v-btn>
                <v-btn prepend-icon="mdi-video" variant="text">Video</v-btn>
                <v-btn prepend-icon="mdi-emoticon-happy" variant="text"
                  >Feeling</v-btn
                >
                <v-btn color="primary" @click="submitPost">Post</v-btn>
              </div>
            </v-card>

            <div class="posts-feed">
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
                class="my-8 mx-auto d-block"
              ></v-progress-circular>

              <template v-else>
                <div v-if="posts.length === 0" class="text-center pa-4">
                  <p>No posts found. Be the first to post something!</p>
                </div>

                <v-card v-for="post in posts" :key="post.id" class="mb-4">
                  <v-card-title>
                    <div class="d-flex align-center">
                      <v-avatar size="40" color="primary" class="mr-3">
                        <v-icon color="white">mdi-account</v-icon>
                      </v-avatar>
                      <div>
                        <div class="font-weight-bold">
                          {{ post.authorNick }}
                        </div>
                        <div class="text-caption">
                          {{ formatDate(post.createDate) }}
                        </div>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <p v-if="post.title" class="font-weight-bold mb-2">
                      {{ post.title }}
                    </p>
                    <p>{{ post.content }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn prepend-icon="mdi-heart-outline" variant="text">
                      Like ({{ post.likes }})
                    </v-btn>
                    <v-btn prepend-icon="mdi-comment-outline" variant="text"
                      >Comment</v-btn
                    >
                    <v-btn prepend-icon="mdi-share-outline" variant="text"
                      >Share</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <v-card class="pa-4 mb-4">
              <v-card-title class="px-0 pt-0">Friend Requests</v-card-title>
              <div class="friend-request d-flex align-center my-2">
                <v-avatar size="40" color="primary" class="mr-3">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="font-weight-medium">Sarah Williams</div>
                  <div class="text-caption">3 mutual friends</div>
                </div>
                <div>
                  <v-btn size="small" color="primary" class="mr-1"
                    >Accept</v-btn
                  >
                  <v-btn size="small" variant="outlined">Decline</v-btn>
                </div>
              </div>
            </v-card>

            <v-card class="pa-4">
              <v-card-title class="px-0 pt-0">Suggested Friends</v-card-title>

              <div class="suggestion d-flex align-center my-2">
                <v-avatar size="40" color="primary" class="mr-3">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="font-weight-medium">Alex Turner</div>
                  <div class="text-caption">5 mutual friends</div>
                </div>
                <v-btn size="small" color="primary" variant="text">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>

              <div class="suggestion d-flex align-center my-2">
                <v-avatar size="40" color="primary" class="mr-3">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="font-weight-medium">Emily Parker</div>
                  <div class="text-caption">2 mutual friends</div>
                </div>
                <v-btn size="small" color="primary" variant="text">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>

              <div class="suggestion d-flex align-center my-2">
                <v-avatar size="40" color="primary" class="mr-3">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="font-weight-medium">David Chen</div>
                  <div class="text-caption">1 mutual friend</div>
                </div>
                <v-btn size="small" color="primary" variant="text">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/configs/api.js";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const newPost = ref({
  title: "",
  content: "",
});

const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await api.get("/posts");
    if (response.status != 201) {
      throw new Error("Failed to fetch posts");
    }
    posts.value = response?.data ?? [];
  } catch (err) {
    console.error("Error fetching posts:", err);
    error.value = "Failed to load posts. Please try again later.";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const submitPost = async () => {
  if (!newPost.value.content.trim()) {
    return;
  }

  try {
    console.log("Submitting post:", newPost.value);

    newPost.value = {
      title: "",
      content: "",
    };

    await fetchPosts();
  } catch (err) {
    console.error("Error creating post:", err);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>
<style scoped>
.app-header {
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-bar {
  max-width: 300px;
}
</style>
