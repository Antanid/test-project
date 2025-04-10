import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox'
import { CheckIcon, Icon, TrashIcon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { cn } from '@/constants/lib/utils'
import { GroceryCardType } from '@/screens/home'
import { TouchableOpacity, View } from 'react-native'

type GroceryCardProps = {
  onDelete: (id: string) => void
  isChecked: boolean
  onCheckChange: (id: string, checked: boolean) => void
  item: GroceryCardType
  onNavigate: (item: GroceryCardType) => void
}

export const GroceryCard = ({
  item,
  onDelete,
  isChecked,
  onCheckChange,
  onNavigate,
}: GroceryCardProps) => {
  return (
    <TouchableOpacity
      className="border-w-1 m-2 flex-row items-center justify-between gap-x-2 rounded border border-outline-700 p-4"
      onPress={() => onNavigate(item)}
    >
      <View className="w-[70%] gap-y-2">
        <Text
          className={cn('font-semibold text-neutral-800', {
            'line-through': isChecked,
          })}
        >
          {item.title}
        </Text>
        <Text className="font-medium text-lime-700">$ {item.price}</Text>
      </View>
      <View className="items-end justify-end">
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Icon as={TrashIcon} className="m-2 h-5 w-5 text-typography-500" />
        </TouchableOpacity>
        <Checkbox
          value={isChecked ? 'checked' : ''}
          size="md"
          isInvalid={false}
          isDisabled={false}
          onChange={checked => onCheckChange(item.id, checked)}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Check</CheckboxLabel>
        </Checkbox>
      </View>
    </TouchableOpacity>
  )
}
