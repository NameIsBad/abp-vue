import { computed, onMounted, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { Modal } from 'ant-design-vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { FormSchema } from '/@/components/Form';
import { OrganizationUnitService } from '/@/api/proxy/identity';
import { listToTree } from '/@/utils/helper/treeHelper';
import { useModal } from '/@/components/Modal';

export function useOuTree({ emit }: { emit: EmitType }) {
  const { t } = useI18n();
  const organizationUnitTree = ref([]);

  const {
    create,
    deleteById: deleteOrganizationUnit,
    getAllList,
    move,
    update,
  } = new OrganizationUnitService();

  const formSchemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: 'id',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'parentId',
      component: 'Input',
      label: 'parentId',
      colProps: { span: 24 },
      ifShow: false,
    },
    {
      field: 'displayName',
      component: 'Input',
      label: t('AbpIdentity.OrganizationUnit:DisplayName'),
      colProps: { span: 24 },
      required: true,
    },
  ];

  const [registerModal, { openModal }] = useModal();

  const getContentMenus = computed(() => {
    return (node: any) => {
      return [
        {
          label: t('AbpIdentity.Edit'),
          handler: () => {
            openModal(true, cloneDeep(node), true);
          },
          icon: 'ant-design:edit-outlined',
        },
        {
          label: t('AbpIdentity.OrganizationUnit:AddChildren'),
          handler: () => {
            openModal(true, { parentId: node.id }, true);
          },
          icon: 'ant-design:plus-outlined',
        },
        {
          label: t('AbpIdentity.Delete'),
          handler: () => {
            Modal.warning({
              title: t('AbpIdentity.AreYouSure'),
              content: t('AbpIdentity.OrganizationUnit:WillDelete', [
                node.displayName,
              ] as Recordable),
              okCancel: true,
              onOk: () => {
                deleteOrganizationUnit(
                  node.id.then(() => {
                    loadTree();
                  }),
                );
              },
            });
          },
          icon: 'ant-design:delete-outlined',
        },
      ];
    };
  });

  function loadTree() {
    getAllList().then((res) => {
      organizationUnitTree.value = listToTree(res.items || [], {
        id: 'id',
        pid: 'parentId',
      });
    });
  }

  function handleSelect(selectedKeys) {
    emit('select', selectedKeys[0]);
  }

  function handleDrop(opt) {
    const api =
      opt.dropPosition === -1
        ? move(opt.dragNode.eventKey, {
            parentId: undefined,
          }) // parent
        : move(opt.dragNode.eventKey, {
            parentId: opt.node.eventKey,
          }); // children
    api.then(() => loadTree());
  }

  function handleSubmit(val) {
    const api = val.id
      ? update(val.id, {
          displayName: val.displayName,
          extraProperties: {},
        })
      : create(val);
    return api.then(() => loadTree());
  }

  onMounted(() => {
    loadTree();
  });
  return {
    organizationUnitTree,
    getContentMenus,
    registerModal,
    openModal,
    formSchemas,
    handleDrop,
    handleSelect,
    handleSubmit,
  };
}
