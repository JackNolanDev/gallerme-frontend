<template>
  <div class="card">
    <div class="row g-0">
      <div class="col-12 col-md-7 col-lg-8 col-xl-6">
        <!-- ************ DRAWING SPACE ************ -->
        <div
          v-bind:style="artBoardStyle"
          @mousedown="startDrawing"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
          class="artBoard"
        >
          <div
            v-for="(pixel, index) in pixels"
            v-bind:key="pixel.id"
            @click="colorPixel(index)"
            @mouseenter="dragColorPixel(index)"
            @mouseleave="dragColorPixel(index)"
            v-bind:style="{ backgroundColor: pixel.color }"
            class="pixel ratio ratio-1x1"
          ></div>
        </div>
      </div>
      <div class="col-12 col-md-5 col-lg-4 col-xl-6">
        <div
          class="
            card-body
            d-flex
            flex-column
            justify-content-between
            cardSeperator
            tall
          "
        >
          <div>
            <h2 class="card-title">Options</h2>
            <!-- ************ BASIC COLOR SELECTOR ************ -->
            <div class="d-flex align-items-center mb-2">
              <label for="colorInput">Draw color:</label>
              <input
                id="colorInput"
                type="color"
                v-model="color"
                class="ms-1"
              />
            </div>
            <!-- ************ FAVORITE COLOR SELECTOR ************ -->
            <div class="accordion mb-2">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    v-on:click="toggleDisplayFavoriteColors"
                    v-bind:class="favoriteColorHeaderClass"
                    class="accordion-button"
                  >
                    Show saved colors
                  </button>
                </h2>
                <div
                  v-bind:class="displayFavoriteColorsClass"
                  class="accordion-collapse collapse"
                >
                  <div class="list-group list-group-flush">
                    <div v-if="showFavoriteColorSelector">
                      <div class="list-group-item">
                        <label for="currentColorForm" class="form-label">
                          Save currently selected color
                        </label>
                        <form class="row">
                          <div
                            class="
                              form-group
                              mb-2
                              col-12 col-sm-8 col-md-12 col-xl-8
                            "
                          >
                            <input
                              type="text"
                              id="currentColorForm"
                              v-model="saveColorField"
                              class="form-control"
                              placeholder="Name for current color"
                            />
                          </div>
                          <div class="mb-2 col-12 col-sm-4 col-md-12 col-xl-4">
                            <button
                              type="button"
                              v-bind:disabled="saveColorButtonDisabled"
                              v-on:click="saveColorButton()"
                              class="btn btn-primary col-12"
                            >
                              Save Color
                            </button>
                          </div>
                        </form>
                      </div>
                      <button
                        v-for="c in colors"
                        v-bind:key="c.id"
                        v-on:click="useFavoriteColor(c.color)"
                        class="list-group-item list-group-item-action"
                      >
                        <display-color :color="c" />
                      </button>
                      <router-link
                        to="/color"
                        class="list-group-item list-group-item-action"
                      >
                        Edit your saved colors
                      </router-link>
                    </div>
                    <div class="list-group-item">
                      <label for="searchColorForm" class="form-label">
                        Search for colors by anyone
                      </label>
                      <form class="row">
                        <div
                          class="
                            form-group
                            mb-2
                            col-12 col-sm-8 col-md-12 col-xl-8
                          "
                        >
                          <input
                            type="text"
                            id="searchColorForm"
                            v-model="searchColorField"
                            class="form-control"
                            placeholder="Search term"
                          />
                        </div>
                        <div class="mb-2 col-12 col-sm-4 col-md-12 col-xl-4">
                          <button
                            type="button"
                            v-bind:disabled="searchColorButtonDisabled"
                            v-on:click="searchColorsButton()"
                            class="btn btn-primary col-12"
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                    <button
                      v-for="c in colorSearchList"
                      v-bind:key="'s' + c.id"
                      v-on:click="useFavoriteColor(c.color)"
                      class="list-group-item list-group-item-action"
                    >
                      <display-color :color="c" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- ************ TOOL SELECTOR ************ -->
            <h5>Select Tool</h5>
            <div class="form-check">
              <input
                type="radio"
                id="pencilOption"
                value="pencil"
                v-model="tool"
                class="form-check-input"
                checked
              />
              <label class="form-check-label" for="pencilOption">
                <i class="fas fa-pencil-alt"></i> Pencil tool
              </label>
            </div>
            <div class="form-check mb-2">
              <input
                type="radio"
                id="bucketOption"
                value="bucket"
                v-model="tool"
                class="form-check-input"
              />
              <label class="form-check-label" for="bucketOption">
                <i class="fas fa-fill-drip"></i> Paint bucket tool
              </label>
            </div>
            <!-- ************ SIZE SELECTOR ************ -->
            <div class="input-group mb-2">
              <label for="sizeInput" class="input-group-text">
                Change size:
              </label>
              <input
                id="sizeInput"
                type="number"
                placeholder="8"
                v-bind:min="minSize"
                v-bind:max="maxSize"
                v-model="sizeInput"
                v-on:input="changeSize"
                class="form-control"
              />
            </div>
          </div>
          <!-- ************ PUBLISH ART BUTTON ************ -->
          <div class="row">
            <div class="col-12 col-xl-8">
              <div class="input-group mb-2">
                <label for="artInput" class="input-group-text">
                  Name your art:
                </label>
                <input
                  id="artInput"
                  type="text"
                  v-model="artName"
                  placeholder="Mona Lisa"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-12 col-xl-4">
              <button
                type="button"
                v-bind:disabled="publishButtonDisabled"
                v-on:click="publishArt"
                class="btn btn-primary col-12"
              >
                Publish!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login-modal ref="LoginModal" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DisplayColor from "./DisplayColor.vue";
import LoginModal from "./loginModal.vue";

const MIN_SIZE = 1;
const MAX_SIZE = 16;
const DEFAULT_SIZE = 8;
const LOCAL_STORAGE_SIZE = "create_size";
const LOCAL_STORAGE_PIXELS = "create_pixels";

export default {
  name: "CreateArt",
  props: {
    showFavoriteColorSelector: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    DisplayColor,
    LoginModal,
  },
  data() {
    return {
      size: 0,
      sizeInput: DEFAULT_SIZE,
      pixels: [],
      color: "#d41b2c",
      artName: "",
      isDrawing: false,
      displayFavoriteColors: false,
      tool: "pencil",
      saveColorField: "",
      searchColorField: "",
      previousSearchTerm: "",
    };
  },
  beforeMount() {
    const localSize = localStorage.getItem(LOCAL_STORAGE_SIZE);
    const localPixels = localStorage.getItem(LOCAL_STORAGE_PIXELS);
    if (localSize != undefined && localPixels != undefined) {
      const parsedSize = parseInt(localSize);
      if (
        !isNaN(parsedSize) &&
        parsedSize >= MIN_SIZE &&
        parsedSize <= MAX_SIZE
      ) {
        try {
          this.size = parsedSize;
          this.sizeInput = localSize;
          this.pixels = JSON.parse(localPixels);
          return;
        } catch (e) {
          localStorage.removeItem(LOCAL_STORAGE_PIXELS);
        }
      }
    }
    this.initBoard(DEFAULT_SIZE);
    localStorage.setItem(LOCAL_STORAGE_SIZE, DEFAULT_SIZE);
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["currentUser"]),
    ...mapState("colors", ["colors", "colorSearchList"]),
    artBoardStyle() {
      return { gridTemplateColumns: `repeat(${this.size}, 1fr)` };
    },
    publishButtonDisabled() {
      return this.artName === "" || this.artName.length > 50;
    },
    minSize() {
      return MIN_SIZE;
    },
    maxSize() {
      return MAX_SIZE;
    },
    displayFavoriteColorsClass() {
      return this.displayFavoriteColors ? "show" : "";
    },
    favoriteColorHeaderClass() {
      return this.displayFavoriteColors ? "" : "collapsed";
    },
    saveColorButtonDisabled() {
      return (
        this.saveColorField === "" ||
        this.colors.some((c) => c.color === this.color) ||
        this.colorSearchList.some((c) => c.color === this.color)
      );
    },
    searchColorButtonDisabled() {
      return (
        this.searchColorField === "" ||
        this.searchColorField === this.previousSearchTerm
      );
    },
  },
  methods: {
    changeSize() {
      if (this.sizeInput >= MIN_SIZE && this.sizeInput <= MAX_SIZE) {
        this.initBoard(parseInt(this.sizeInput));
        localStorage.setItem(LOCAL_STORAGE_SIZE, this.sizeInput);
      }
    },
    initBoard(size) {
      this.size = size;
      this.pixels = [];
      for (let i = 0; i < size * size; i++) {
        this.pixels.push({ id: i, color: "#ffffff" });
      }
      localStorage.setItem(LOCAL_STORAGE_PIXELS, JSON.stringify(this.pixels));
    },
    colorPixel(index) {
      if (this.pixels[index].color !== this.color) {
        if (this.tool === "pencil") {
          this.pixels[index].color = this.color;
        } else if (this.tool === "bucket") {
          this.bucketFill(index, this.pixels[index].color);
        }
        localStorage.setItem(LOCAL_STORAGE_PIXELS, JSON.stringify(this.pixels));
      }
    },
    bucketFill(index, checkColor) {
      // if fill colors match, then we will replace this pixel
      if (this.pixels[index].color === checkColor) {
        this.pixels[index].color = this.color;
        if (index >= this.size) {
          // not on top, can check 1 above
          this.bucketFill(index - this.size, checkColor);
        }
        if (index < this.size * (this.size - 1)) {
          // not on bottom, can check 1 below
          this.bucketFill(index + this.size, checkColor);
        }
        if (index % this.size !== 0) {
          // not on left wall, can check 1 to the left
          this.bucketFill(index - 1, checkColor);
        }
        if (index % this.size !== this.size - 1) {
          // not on right wall, can check 1 to the right
          this.bucketFill(index + 1, checkColor);
        }
      }
    },
    startDrawing() {
      this.isDrawing = true;
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    dragColorPixel(index) {
      if (this.isDrawing) {
        this.colorPixel(index);
      }
    },
    toggleDisplayFavoriteColors() {
      this.displayFavoriteColors = !this.displayFavoriteColors;
    },
    useFavoriteColor(color) {
      this.color = color;
    },
    publishArt() {
      const data = this.pixels.reduce(
        (prev, current) => (prev += current.color.substring(1)),
        ""
      );
      const response = { name: this.artName, size: this.size, data };
      // Check if we used any of our saved colors
      const usedColorSet = new Set(this.pixels.map((pixel) => pixel.color));
      const colorIds = this.colors
        .filter((c) => usedColorSet.has(c.color))
        .map((c) => c.id);
      const searchColorIds = this.colorSearchList
        .filter((c) => usedColorSet.has(c.color))
        .filter((c) => !colorIds.includes(c.id))
        .map((c) => c.id);
      colorIds.push(...searchColorIds);
      if (colorIds.length > 0) {
        response.colors = colorIds;
      }
      this.$emit("published", response);
    },
    saveColorButton() {
      if (!this.isLoggedIn) {
        this.$refs.LoginModal.toggleVisible();
        return;
      }
      const newColor = {
        user_id: this.currentUser.id,
        name: this.saveColorField,
        color: this.color,
      };
      this.$store.dispatch("colors/createColor", {
        color: newColor,
        redirectLink: false,
      });
    },
    searchColorsButton() {
      this.previousSearchTerm = this.searchColorField;
      this.$store.dispatch("colors/searchForColors", this.searchColorField);
    },
  },
};
</script>

<style scoped>
.artBoard {
  display: grid;
}
.artBoard:hover {
  cursor: pointer;
}

.pixel:hover {
  border-style: solid;
  border-width: 3px;
}

.tall {
  height: 100%;
}

.favoriteColorExample {
  width: 50px;
  height: 50px;
}

.cardSeperator {
  border-top: 1px solid #dee2e6;
}

/* 768px is md for bootstrap */
@media (min-width: 768px) {
  .cardSeperator {
    border-left: 1px solid #dee2e6;
    border-top: 0px;
  }
}
</style>
