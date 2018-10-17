import Vue from 'vue';
import Component from './func-notification';

const NotificationConstructor = Vue.extend(Component);

const instances = [];
let seed = 0;

const removeInstance = (instance) => {
  if (!instance) {
    return;
  }
  const len = instances.length;
  const index = instances.findIndex(inst => inst.id === instance.id);

  instances.splice(index, 1);

  if (len <= 1) {
    return;
  }
  const removeHeight = instance.vm.height;
  for (let i = index; i < len - 1; i += 1) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset, 10) - removeHeight - 16;
  }
};

const notify = (options) => {
  if (Vue.prototype.$isServer) {
    return null;
  }

  const {
    autoClose = 3000,
    ...rest
  } = options;

  const instance = new NotificationConstructor({
    propsData: {
      ...rest,
    },
    data: {
      autoClose,
    },
  });
  seed += 1;
  const id = `notification_${seed}`;
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  let verticalOffset = 0;
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);
  instance.vm.$on('closed', () => {
    removeInstance(instance);
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destory();
  });

  instance.vm.$on('close', () => {
    instance.vm.visible = false;
  });
  return instance.vm;
};

export default notify;
