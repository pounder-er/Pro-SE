import ReactDataGrid from '@inovua/reactdatagrid-community';

export const i18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
    sortAsc: 'เรียงน้อยไปมาก',
    sortDesc: 'เรียงมากไปน้อย',
    clear: 'ลบ',
    clearAll: 'ลบทั้งหมด',
    contains: 'ประกอบด้วย',
    startsWith: 'เริ่มด้วย',
    endsWith: 'จบด้วย',
    neq: 'ไม่เท่ากับ',
    eq: 'เท่ากับ',
    notEmpty: 'ไม่ว่าง',
    empty: 'ว่าง',
    notContains: 'ไม่ได้ประกอบด้วย',
    disable:'ปิดตัวกรอง',
enable:'เปิดตัวกรอง',
pageText:'หน้า ',
ofText:' จาก ',
perPageText:'แสดงรายการทีละ',
showingText:'กำลังแสดงรายการ '
})