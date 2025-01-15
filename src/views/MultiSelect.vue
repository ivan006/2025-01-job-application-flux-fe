<template>
  <div class="MultiSelect">
    <q-input
      v-bind="inputProps"
      v-model="computedLabel"
      @focus="toggleDropdown"
      readonly
      filled
    >
      <template v-slot:append>
        <q-icon name="arrow_drop_down" />
      </template>
    </q-input>
    <q-menu fit ref="dropdown" v-model="menuVisible">
      <div class="dropdown-content">
        <q-list style="min-width: 200px;" class="dropdown-list">
          <template v-if="!props.disableGrouping">
            <template v-for="(group, groupIndex) in processedOptions" :key="groupIndex">
              <q-item
                clickable
                @click="toggleGroup(group.group)"
                class="q-pa-sm"
                style="font-weight: bold; font-size: 1.1em; color: black; font-weight: bold; height: 60px;"
              >
                <q-item-section>
                  {{ group.group }}
                </q-item-section>
                <q-item-section side>
                  <q-icon :name="expandedGroups.includes(group.group) ? 'expand_less' : 'expand_more'" />
                </q-item-section>
              </q-item>
              <div v-if="expandedGroups.includes(group.group)">
                <q-item
                  v-for="option in group.children"
                  :key="option[optionValue]"
                  clickable
                  v-ripple
                  class="q-ml-md"
                >
                  <q-checkbox
                    v-model="selectedValues"
                    :val="getOptionValue(option)"
                    :label="getOptionLabel(option)"
                    @change="emitChange"
                    :disable="isMaxSelected(option)"
                  />
                </q-item>
              </div>
            </template>
          </template>
          <template v-else>
            <q-item
              v-for="option in props.options"
              :key="option[optionValue]"
              clickable
              v-ripple
            >
              <q-checkbox
                v-model="selectedValues"
                :val="getOptionValue(option)"
                :label="getOptionLabel(option)"
                @change="emitChange"
                :disable="isMaxSelected(option)"
              />
            </q-item>
          </template>
        </q-list>
        <div class="dropdown-footer">
          <div class="row no-wrap items-center q-gutter-sm justify-end">

            <span v-if="props.maxSelection > 0" style="margin-right: 10px;">
              {{ selectedValues.length }}/{{ props.maxSelection }}
            </span>
            <q-btn
              @click="confirmSelection"
              label="OK"
              color="primary"
            />
          </div>
        </div>
      </div>
    </q-menu>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { QInput, QIcon, QMenu, QList, QItem, QCheckbox, QItemLabel, QBtn } from 'quasar';

const props = defineProps({
  ...QInput.props, // Inherit QInput props
  modelValue: {
    type: [String, Number, Array],
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  emitValue: {
    type: Boolean,
    default: false,
  },
  mapOptions: {
    type: Boolean,
    default: false,
  },
  optionValue: {
    type: String,
    default: 'value',
  },
  optionLabel: {
    type: String,
    default: 'label',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  filled: {
    type: Boolean,
    default: false,
  },
  groupBy: {
    type: String,
    required: false,
  },
  disableGrouping: {
    type: Boolean,
    default: false,
  },
  maxSelection: {
    type: [Number, String],
    default: 0, // Default maximum selection length (0 means no limit)
  },
});

const emits = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);
const expandedGroups = ref([]);
const menuVisible = ref(false);

const getOptionValue = (option) => {
  return props.mapOptions ? option[props.optionValue] : option;
};

const getOptionLabel = (option) => {
  return props.mapOptions ? option[props.optionLabel] : option;
};

const selectedValues = computed({
  get() {
    return internalValue.value;
  },
  set(val) {
    if (props.maxSelection > 0 && Array.isArray(val) && val.length > props.maxSelection) {
      internalValue.value = val.slice(0, props.maxSelection);
    } else {
      internalValue.value = val;
    }
    emits('update:modelValue', internalValue.value);
  },
});

const toggleGroup = (group) => {
  const index = expandedGroups.value.indexOf(group);
  if (index === -1) {
    expandedGroups.value.push(group);
  } else {
    expandedGroups.value.splice(index, 1);
  }
};

const processedOptions = computed(() => {
  if (props.disableGrouping || !props.groupBy) {
    return [{group: 'All Options', children: props.options}];
  }

  const grouped = {};
  const result = [...props.options];

  result.sort((a, b) => {
    const aGroupValue = props.groupBy.split('.').reduce((obj, key) => obj && obj[key], a) || '';
    const bGroupValue = props.groupBy.split('.').reduce((obj, key) => obj && obj[key], b) || '';
    if (aGroupValue < bGroupValue) return -1;
    if (aGroupValue > bGroupValue) return 1;
    if (getOptionLabel(a) < getOptionLabel(b)) return -1;
    if (getOptionLabel(a) > getOptionLabel(b)) return 1;
    return 0;
  });

  result.forEach(option => {
    const groupValue = props.groupBy.split('.').reduce((obj, key) => obj && obj[key], option) || 'Ungrouped';

    if (!grouped[groupValue]) {
      grouped[groupValue] = {isGroup: true, group: groupValue, children: []};
    }

    grouped[groupValue].children.push(option);
  });

  return Object.values(grouped);
});

const emitChange = () => {
  emits('update:modelValue', internalValue.value);
};

const computedLabel = computed(() => {
  if (!Array.isArray(internalValue.value)) {
    return getOptionLabel(internalValue.value);
  }

  if (internalValue.value.length === 0) {
    return '';
  }

  return internalValue.value
    .map((val) => {
      const option = props.options.find((opt) => getOptionValue(opt) === val);
      return getOptionLabel(option);
    })
    .join(', ');
});

const inputProps = computed(() => {
  const {
    modelValue,
    options,
    emitValue,
    mapOptions,
    optionValue,
    optionLabel,
    multiple,
    filled,
    groupBy,
    disableGrouping,
    ...restProps
  } = props;
  return restProps;
});

const toggleDropdown = () => {
  menuVisible.value = !menuVisible.value;
};

const confirmSelection = () => {
  menuVisible.value = false;
  emitChange();
};

const isMaxSelected = (option) => {
  return props.maxSelection > 0 && selectedValues.value.length >= props.maxSelection && !selectedValues.value.includes(getOptionValue(option));
};

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
}, {immediate: true});
</script>

<style>
.MultiSelect .q-field--filled.q-field--readonly .q-field__control:before {
  border-bottom-style: solid;
  border-bottom-width: 0;
}

.MultiSelect .q-field--filled .q-field__control:before {
  border-bottom: solid 0 grey;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  max-height: 500px; /* Adjust as needed */
}

.dropdown-list {
  flex: 1;
  overflow-y: auto;
}

.dropdown-footer {
  flex-shrink: 0;
  padding: 8px;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>
