
<script type="text/javascript">
import ListComponent from './list';
import TitleComponent from './title';
import InputComponent from './input';

export default {
  props: {
    props: {
      type: Object,
      default () {
        return {
          value: 'value',
          label: 'label',
          children: 'children'
        };
      }
    },
    options: Array,
    value: Array,
    titles: Array,
    placeholder: String,
    separator: {
      type: String,
      default: '/'
    },
    size: String,
    changeOnSelect: Boolean,
    name: String
  },
  watch: {
    options (v) {
      this.lists = [v];
    }
  },
  data () {
    return {
      lists: [],
      currentLevel: 0,
      complated: false,
      tempSelecteds: []
    };
  },
  computed: {
    selecteds: {
      get () {
        return this.value || [];
      },
      set (v) {
        this.$emit('input', v);
      }
    },
    titleMode () {
      return !!this.titles;
    }
  },
  methods: {
    reset () {
      this.selecteds = [];
      this.tempSelecteds = [];
      this.switchLevel(0);
    },
    switchLevel (i) {
      this.currentLevel = i;
    },
    listChange (item, level) {
      const nextLevel = level + 1;
      const children = item[this.props.children];

      this.tempSelecteds[level] = item;
      this.tempSelecteds = JSON.parse(JSON.stringify(this.tempSelecteds.slice(0, level + 1)));
      this.$emit('change', this.tempSelecteds);

      if (children) {
        this.$set(this.lists, nextLevel, children);

        if (this.titleMode) {
          this.$nextTick(() => {
            this.switchLevel(nextLevel);
          });
        }
        // this.$emit('activeItemChange', children);
      } else {
        this.$delete(this.lists, nextLevel);
        this.$emit('complated');
        this.cascader.componentInstance.close();

        if (!this.changeOnSelect) {
          this.selecteds = JSON.parse(JSON.stringify(this.tempSelecteds.map(item => item[this.props.value])));
        }
      }

      if (this.changeOnSelect) {
        this.selecteds = JSON.parse(JSON.stringify(this.tempSelecteds.map(item => item[this.props.value])));
      }
    }
  },
  render (h) {
    const cols = this.lists.map((list, i) => {
      const cp = h(ListComponent, {
        props: {
          list,
          props: this.props,
          value: this.tempSelecteds[i]
        },
        on: {
          change: item => {
            this.listChange(item, i);
          }
        }
      });
      if (this.titleMode) {
        if (this.currentLevel === i) {
          return cp;
        }
      } else {
        return cp;
      }
    });

    const t = h(TitleComponent, {
      props: {
        titles: this.titles,
        lists: this.lists,
        current: this.currentLevel
      },
      on: {
        switch: this.switchLevel
      }
    });

    this.cascader = h(InputComponent, {
      props: {
        selects: this.tempSelecteds.map(item => item[this.props.label]).join(this.separator),
        placeholder: this.placeholder,
        visible: this.visible,
        name: this.name,
        size: this.size
      },
      on: {
        reset: this.reset
      },
      class: {
        'is-title-mode': this.titleMode
      }
    }, [t].concat(cols));

    return this.cascader;
  }
};
</script>
