import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

import MenuLinkItem from '../MenuLinkItem'

export default (props) => {
  const { activeItem, courseId, homeworkId } = props;
  return (
    <div className='centeredTabularMenuWrapper' style={{ marginBottom: 16 }}>
      <Menu tabular color='blue' compact>

        <MenuLinkItem
          active={activeItem === 'submit'}
          href={{
            pathname: '/courses/homework',
            query: { courseId, homeworkId },
          }}
          content='Odevzdat'
        />

        <MenuLinkItem
          active={activeItem === 'review'}
          href={{
            pathname: '/courses/homework-review',
            query: { courseId, homeworkId },
          }}
          content='Review'
        />

      </Menu>
    </div>
  );
}
