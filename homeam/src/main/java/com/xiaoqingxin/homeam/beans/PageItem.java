package com.xiaoqingxin.homeam.beans;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 记录序号、状态等信息
 * @author Wu Liangxing
 */
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageItem {
    /**
     * 显示页码，还是省略号...
     */
    private PageItemType pageItemType;
    /**
     * 序号
     */
    private int index;
    /**
     * 是否为当前页
     */
    private boolean active;
}
